import React, { useState, useEffect, useRef } from 'react';
import styles from './styles/UserDashboard.module.css'; 
import { Folder, Chat, Settings, Forum } from '@mui/icons-material'; 
import Greeting from '../components/Greeting';
import { useAuth } from '../context/AuthContext'; 
import axios from 'axios'; 
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField, IconButton, InputAdornment } from '@mui/material'; 
import SendIcon from '@mui/icons-material/Send'; 
import Chatbot from '../components/Chatbot';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const UserDashboard = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();

  const { user, loading } = useAuth();
  const userId = user?._id;

  const [activeSection, setActiveSection] = useState('liveChat'); 
  const [chatHistory, setChatHistory] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [subscriptionPlan, setSubscriptionPlan] = useState('Basic'); 
  const [liveChatMessages, setLiveChatMessages] = useState([]); 
  const [liveMessage, setLiveMessage] = useState('');

  const lastMessageRef = useRef(null);

  // Fetch chat history (mock API call)
  const fetchLast30DaysChats = async () => {
    try {
      const date30DaysAgo = new Date();
      date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);

      const response = await axios.get(`${apiUrl}/api/chat/live/${userId}?from=${date30DaysAgo.toISOString()}`);
      setLiveChatMessages(response.data.chats);
    } catch (error) {
      console.error('Error fetching last 30 days of chats:', error);
    }
  };

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/chat/history/${userId}`);
      setChatHistory(response.data.chats);
      setFilteredChats(response.data.chats);
      setLiveChatMessages(response.data.chats);
      console.log(response.data.chats);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };
  

  // Handle chat filtering by date range and search term
  const handleFilterChats = () => {
    const filtered = chatHistory.filter(chat => {
      const chatDate = new Date(chat.timestamp);
      const inDateRange = (!startDate || chatDate >= startDate) && (!endDate || chatDate <= endDate);
      const containsSearchTerm = chat.message.toLowerCase().includes(searchTerm.toLowerCase());
      return inDateRange && containsSearchTerm;
    });
    setFilteredChats(filtered);
  };

  const handleSendMessage = async () => {
    const userInput = liveMessage.trim();
    const messagesDiv = document.getElementById('chatMessages');

    if (userInput !== "") {
        // Append user's message immediately
        const userMessage = {
            id: Date.now(),
            userId: user._id,
            message: userInput,
            botResponse: null,
            timestamp: new Date()
        };

        setLiveChatMessages(prevMessages => [
            ...prevMessages,
            { id: Date.now() + 1, userId: "bot", message: userInput, botResponse: "", isTyping: true, timestamp: new Date() }
        ]);

        setLiveMessage(''); // Clear input field

        try {
            const response = await axios.post(`${apiUrl}/api/chat/chat`, { message: userInput, userId: user._id }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });

            const botReply = response.status === 200 && response.data.message === 'Chat limit reached'
                ? 'Chat limit reached!'
                : response.data.message;

            setLiveChatMessages(prevMessages =>
                prevMessages.map((msg, index) =>
                    index === prevMessages.length - 1
                        ? { ...msg, botResponse: botReply, isTyping: false }
                        : msg
                )
            );

            messagesDiv.scrollTop = messagesDiv.scrollHeight;

        } catch (error) {
            setLiveChatMessages(prevMessages =>
                prevMessages.map((msg, index) =>
                    index === prevMessages.length - 1
                        ? { ...msg, message: "Error: Couldn't send message. Please try again later.", botResponse: "Error: Couldn't send message. Please try again later.", isTyping: false }
                        : msg
                )
            );
        }
    }
};

  useEffect(() => {
    if (userId) {
      fetchChatHistory();
      fetchLast30DaysChats();
    }
  }, [userId]);

  useEffect(() => {
    handleFilterChats();
  }, [startDate, endDate, searchTerm]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [liveChatMessages, activeSection]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isNewDay = (prevDate, currDate) => {
    const prev = new Date(prevDate).setHours(0, 0, 0, 0);
    const curr = new Date(currDate).setHours(0, 0, 0, 0);
    return prev !== curr;
  };

  const sidebarItems = [
    { id: 'liveChat', label: 'Live Chat', icon: <Forum className={styles.icon} /> },
    { id: 'chatHistory', label: 'Chat History', icon: <Chat className={styles.icon} /> },
    { id: 'settings', label: 'Settings', icon: <Settings className={styles.icon} /> },
  ];

  const renderDateDivider = (currentChat, index) => {
    if (index === 0 || isNewDay(chatHistory[index - 1]?.timestamp, currentChat.timestamp)) {
      return (
        <div className={styles.dateDivider}>
          {formatDate(currentChat.timestamp)}
        </div>
      );
    }
    return null;
  };

  const handleUpgradePlan = ()=>{
    navigate('/pricing');
  }

  if(loading) return (<Loading/>);

  if(!user) (navigate('/login'))

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className={styles.dashboardPage}>
  
          {/* Sidebar */}
          <div className={styles.sidebar}>
            {sidebarItems.map(item => (
              <div
                key={item.id}
                className={`${styles.sidebarItem} ${activeSection === item.id ? styles.active : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
  
          {/* Main Content */}
          <div className={styles.mainContent}>
          <Greeting />

            {activeSection === 'chatHistory' && (
              <>
                <h1 className={styles.title}>Chat History</h1>
                <div className={styles.filters}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    renderInput={(params) => <TextField {...params} className={styles.datePicker} />}
                  />
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    renderInput={(params) => <TextField {...params} className={styles.datePicker} />}
                  />
                  <TextField
                    type="text"
                    label="Search by message"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>
                <div className={styles.chatHistory}>
                  {filteredChats.length ? (
                    filteredChats.map((chat, index) => (
                      <React.Fragment key={chat._id}>
                        {renderDateDivider(chat, index)}
                        <div className={styles.userChat}>
                          <div className={styles.bubble}>
                            <p>{chat.message}</p>
                            <span className={styles.timestamp}>{formatTime(chat.timestamp)}</span>
                          </div>
                        </div>
                        {chat.botResponse && (
                          <div className={styles.botChat}>
                            <div className={styles.bubble}>
                              {/* <p>{chat.botResponse}</p> */}
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>{chat.botResponse}</ReactMarkdown>
                              <span className={styles.timestamp}>{formatTime(chat.timestamp)}</span>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <div>No chat history found</div>
                  )}
                </div>
              </>
            )}
  
            {activeSection === 'liveChat' && (
              <>
                <h1 className={styles.title}>Live Chat</h1>
                <div className={styles.liveChat}>
                  <div className={styles.chatWindow}>
                    <div className={styles.chatMessages} id="chatMessages">
                      {liveChatMessages.length ? (
                        liveChatMessages.map((chat, index) => (
                          <React.Fragment key={chat.id}>
                            {renderDateDivider(chat, index)}
                            <div className={styles.userChat}>
                              <div className={styles.bubble}>
                                <p>{chat.message}</p>
                                <span className={styles.timestamp}>{formatTime(chat.timestamp)}</span>
                              </div>
                            </div>
                            {chat.botResponse && (
                              <div className={styles.botChat}>
                                <div className={styles.bubble}>
                                  {/* <p>{chat.botResponse}</p> */}
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{chat.botResponse}</ReactMarkdown>
                                  <span className={styles.timestamp}>{formatTime(chat.timestamp)}</span>
                                </div>
                              </div>
                            )}
                            {chat.isTyping && (
                              <div className={styles.botChat}>
                                  <div className={styles.typingBubble}>
                                      <div className={styles.typingIndicator}>
                                          <div className={styles.dot}></div>
                                          <div className={styles.dot}></div>
                                          <div className={styles.dot}></div>
                                      </div>
                                  </div>
                              </div>
                          )}
                          </React.Fragment>
                        ))
                      ) : (
                        <div className={styles.noMessages}>No messages yet</div>
                      )}
                      <div ref={lastMessageRef} />
                    </div>
                    <div className={styles.inputContainer}>
                      <TextField
                        label="Type your message"
                        variant="outlined"
                        fullWidth
                        value={liveMessage}
                        onChange={(e) => setLiveMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleSendMessage}>
                                <SendIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
  
            {activeSection === 'settings' && (
              <div className={styles.settings}>
                <h1 className={styles.title}>Account Settings</h1>
                <div className={styles.accountSettings}>
                  <div className={styles.settingItem}>
                    <label>Email:</label>
                    <TextField value={user.email} readOnly fullWidth />
                  </div>
                  <div className={styles.settingItem}>
                    <label>Password:</label>
                    <button className={styles.changePasswordButton} onClick={() => alert('Change Password')}>
                      Change Password
                    </button>
                  </div>
                  <div className={styles.subscriptionInfo}>
                    <div className={styles.settingItem}>
                      <strong>Subscription Tier:</strong> {subscriptionPlan}
                    </div>
                    <button className={styles.upgradeButton} onClick={() => handleUpgradePlan()}>
                      Upgrade Plan
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {activeSection !== 'liveChat' && <Chatbot />}
      </LocalizationProvider>
    );
};

export default UserDashboard;
