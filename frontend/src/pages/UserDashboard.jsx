import React, { useState, useEffect } from 'react';
import styles from './styles/UserDashboard.module.css'; // Importing modular CSS
import { Folder, Chat, Settings, Forum } from '@mui/icons-material'; // Icons
import Greeting from '../components/Greeting';
import { useAuth } from '../context/AuthContext'; // Use auth context for userId
import axios from 'axios'; // For fetching chat history
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField, IconButton, InputAdornment } from '@mui/material'; // For search, input, and date inputs
import SendIcon from '@mui/icons-material/Send'; // Send button icon
import Chatbot from '../components/Chatbot';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();

  const { user, loading } = useAuth();
  const userId = user?._id;

  const [activeSection, setActiveSection] = useState('chatHistory'); // Track active section
  const [chatHistory, setChatHistory] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [subscriptionPlan, setSubscriptionPlan] = useState('Basic'); // Example: User subscription plan
  const [liveChatMessages, setLiveChatMessages] = useState([]); // For live chat messages
  const [liveMessage, setLiveMessage] = useState('');

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

  // const fetchChatHistory = async () => {
  //   try {
  //     const response = await axios.get(`/api/chat/history/${userId}`);
      
  //     // Initialize an empty array to store formatted chat history
  //     const formattedChats = [];
  
  //     // Loop through the chats two at a time (user and bot response)
  //     for (let i = 0; i < response.data.chats.length; i += 2) {
  //       const userMessage = response.data.chats[i]; // User message comes first
  //       const botMessage = response.data.chats[i + 1]; // Bot message comes next
  
  //       // Format the chats to match the structure of liveChatMessages
  //       formattedChats.push({
  //         id: userMessage._id, // Assuming user message has an _id field
  //         user: 'User',
  //         message: userMessage.message, // User's message
  //         botResponse: botMessage ? botMessage.message : '', // Bot's response, if exists
  //         timestamp: new Date(userMessage.timestamp), // Use user message timestamp for grouping
  //       });
  //     }
  
  //     // Update state with formatted chats
  //     setChatHistory(formattedChats);
  //     setFilteredChats(formattedChats); // Set filteredChats as formattedChats initially
  //     setLiveChatMessages(formattedChats); // Store formatted chats in liveChatMessages as well
  //   } catch (error) {
  //     console.error('Error fetching chat history:', error);
  //   }
  // };
  

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
    const messagesDiv = document.getElementById('chatMessages'); // Assuming you give an id to the message container
  
    if (userInput !== "") {
      // Append user's message to the chat
      // setLiveChatMessages(prevMessages => [
      //   ...prevMessages,
      //   { id: Date.now(), user: 'User', message: userInput, timestamp: new Date() }
      // ]);
      
      setLiveMessage(''); // Clear input field
  
      try {
        // Send user input to the backend
        const response = await axios.post(`${apiUrl}/api/chat/chat`, { message: userInput, userId: user._id }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
  
        // Bot's response
        const botReply = response.status === 200 && response.data.message === 'Chat limit reached'
          ? 'Chat limit reached!'
          : response.data.message;
  
        // Append bot's response to the chat
        setLiveChatMessages(prevMessages => [
          ...prevMessages,
          { id: Date.now() + 1, userId: user._id, message: userInput,botResponse: botReply, timestamp: new Date() }
        ]);
  
        // Scroll to the bottom of chat
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
  
      } catch (error) {
        // In case of error, show error message in chat
        setLiveChatMessages(prevMessages => [
          ...prevMessages,
          { id: Date.now() + 1, userId: user._id, message: userInput,botResponse: "Error: Couldn't send message. Please try again later.", timestamp: new Date() }
        ]);
      }
    }
  };
  

  // Mock function to send a live chat message
  // const sendLiveChatMessage = () => {
  //   if (currentMessage.trim() === '') return;

  //   const newMessage = {
  //     id: liveChatMessages.length + 1,
  //     sender: 'user',
  //     content: currentMessage,
  //     timestamp: new Date().toLocaleTimeString(),
  //   };
  //   setLiveChatMessages([...liveChatMessages, newMessage]);
  //   setCurrentMessage('');

  //   // Simulate bot response
  //   setTimeout(() => {
  //     const botResponse = {
  //       id: liveChatMessages.length + 2,
  //       sender: 'bot',
  //       content: `Bot response to: "${newMessage.content}"`,
  //       timestamp: new Date().toLocaleTimeString(),
  //     };
  //     setLiveChatMessages((prevMessages) => [...prevMessages, botResponse]);
  //   }, 1000); // Delay to simulate bot typing
  // };

  useEffect(() => {
    if (userId) {
      fetchChatHistory();
      fetchLast30DaysChats();
    }
  }, [userId]);

  useEffect(() => {
    handleFilterChats();
  }, [startDate, endDate, searchTerm]);

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
    { id: 'chatHistory', label: 'Chat History', icon: <Chat className={styles.icon} /> },
    { id: 'liveChat', label: 'Live Chat', icon: <Forum className={styles.icon} /> },
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
          <Greeting />
  
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
                              <p>{chat.botResponse}</p>
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
                                  <p>{chat.botResponse}</p>
                                  <span className={styles.timestamp}>{formatTime(chat.timestamp)}</span>
                                </div>
                              </div>
                            )}
                            {/* {renderDateDivider(chat, index)}
                            <div className={chat.user === 'User' ? styles.userChat : styles.botChat}>
                              <div className={styles.bubble}>
                                <p>{chat.message}</p>
                                <span className={styles.timestamp}>{formatTime(chat.timestamp)}</span>
                              </div>
                            </div> */}
                          </React.Fragment>
                        ))
                      ) : (
                        <div className={styles.noMessages}>No messages yet</div>
                      )}
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

  // return (
  //   <LocalizationProvider dateAdapter={AdapterDateFns}>
  //     <div className={styles.dashboardPage}>
  //       <Greeting />

  //       {/* Sidebar */}
  //       <div className={styles.sidebar}>
  //         {sidebarItems.map(item => (
  //           <div
  //             key={item.id}
  //             className={`${styles.sidebarItem} ${activeSection === item.id ? styles.active : ''}`}
  //             onClick={() => setActiveSection(item.id)}
  //           >
  //             {item.icon}
  //             <span>{item.label}</span>
  //           </div>
  //         ))}
  //       </div>

  //       {/* Main Content */}
  //       <div className={styles.mainContent}>
  //         {activeSection === 'chatHistory' && (
  //           <>
  //             <h1 className={styles.title}>Chat History</h1>
  //             <div className={styles.filters}>
  //               <DatePicker
  //                 label="Start Date"
  //                 value={startDate}
  //                 onChange={(newValue) => setStartDate(newValue)}
  //                 renderInput={(params) => <TextField {...params} className={styles.datePicker} />}
  //               />
  //               <DatePicker
  //                 label="End Date"
  //                 value={endDate}
  //                 onChange={(newValue) => setEndDate(newValue)}
  //                 renderInput={(params) => <TextField {...params} className={styles.datePicker} />}
  //               />
  //               <TextField
  //                 type="text"
  //                 label="Search by message"
  //                 value={searchTerm}
  //                 onChange={(e) => setSearchTerm(e.target.value)}
  //                 className={styles.searchInput}
  //               />
  //             </div>
  //             <div className={styles.chatHistory}>
  //               {filteredChats.length ? (
  //                 filteredChats.map((chat, index) => (
  //                   <React.Fragment key={chat._id}>
  //                     <div className={styles.userChat}>
  //                       <div className={styles.bubble}>
  //                         <p>{chat.message}</p>
  //                         <span className={styles.timestamp}>{new Date(chat.timestamp).toLocaleTimeString()}</span>
  //                       </div>
  //                     </div>
  //                     <div className={styles.botChat}>
  //                       <div className={styles.bubble}>
  //                         <p>{chat.botResponse}</p>
  //                         <span className={styles.timestamp}>{new Date(chat.timestamp).toLocaleTimeString()}</span>
  //                       </div>
  //                     </div>
  //                   </React.Fragment>
  //                 ))
  //               ) : (
  //                 <div>No chat history found</div>
  //               )}
  //             </div>
  //           </>
  //         )}

  //         {activeSection === 'liveChat' && (
  //           <>
  //             <h1 className={styles.title}>Live Chat</h1>
  //             <div className={styles.liveChat}>
  //               <div className={styles.chatWindow}>
  //                 <div className={styles.chatMessages}>
  //                   {liveChatMessages.length ? (
  //                     liveChatMessages.map((chat) => (
  //                       // <div key={msg.id} className={msg.user === 'User' ? styles.userChat : styles.botChat}>
  //                       //   <div className={styles.bubble}>
  //                       //     <p>{msg.message}</p>
  //                       //     <span className={styles.timestamp}>{formatTime(msg.timestamp)}</span>
  //                       //   </div>
  //                       // </div>
  //                       <>
  //                       <div className={styles.userChat}>
  //                         <div className={styles.bubble}>
  //                           <p>{chat.message}</p>
  //                           <span className={styles.timestamp}>{new Date(chat.timestamp).toLocaleTimeString()}</span>
  //                         </div>
  //                       </div>
  //                       <div className={styles.botChat}>
  //                         <div className={styles.bubble}>
  //                           <p>{chat.botResponse}</p>
  //                           <span className={styles.timestamp}>{new Date(chat.timestamp).toLocaleTimeString()}</span>
  //                         </div>
  //                       </div>
  //                       </>
  //                     ))
  //                   ) : (
  //                     <div className={styles.noMessages}>No messages yet</div>
  //                   )}
  //                 </div>
  //                 <div className={styles.inputContainer}>
  //                   <TextField
  //                     label="Type your message"
  //                     variant="outlined"
  //                     fullWidth
  //                     value={liveMessage}
  //                     onChange={(e) => setLiveMessage(e.target.value)}
  //                     onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
  //                     InputProps={{
  //                       endAdornment: (
  //                         <InputAdornment position="end">
  //                           <IconButton onClick={handleSendMessage}>
  //                             <SendIcon />
  //                           </IconButton>
  //                         </InputAdornment>
  //                       ),
  //                     }}
  //                   />
  //                 </div>
  //               </div>
  //             </div>
  //           </>
  //         )}

  //         {activeSection === 'settings' && (
  //           <div className={styles.settings}>
  //             <h1 className={styles.title}>Account Settings</h1>
  //             <div className={styles.accountSettings}>
  //               <div>
  //                 <label>Email: </label>
  //                 <input type="email" value={user.email} readOnly />
  //               </div>
  //               <div>
  //                 <label>Password: </label>
  //                 <button className={styles.changePasswordButton} onClick={() => alert('Change Password')}>
  //                   Change Password
  //                 </button>
  //               </div>
  //               <div className={styles.subscriptionInfo}>
  //                 <div><strong>Subscription Tier:</strong> {subscriptionPlan}</div>
  //                 <button className={styles.upgradeButton} onClick={() => alert('Upgrade to a higher plan!')}>
  //                   Upgrade Plan
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //     {activeSection!='liveChat' && (
  //       <Chatbot/>
  //     )}
  //   </LocalizationProvider>
  // );
};

export default UserDashboard;


// import React, { useState, useEffect } from 'react';
// import styles from './styles/UserDashboard.module.css'; // Importing modular CSS
// import { Folder, Chat, Settings, Forum } from '@mui/icons-material'; // Icons
// import Greeting from '../components/Greeting';
// import { useAuth } from '../context/AuthContext'; // Use auth context for userId
// import axios from 'axios'; // For fetching chat history
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { TextField } from '@mui/material'; // For search and date inputs

// const UserDashboard = () => {
//   const { user } = useAuth();
//   const userId = user?._id;

//   const [activeSection, setActiveSection] = useState('chatHistory'); // Track active section
//   const [chatHistory, setChatHistory] = useState([]);
//   const [filteredChats, setFilteredChats] = useState([]);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [subscriptionPlan, setSubscriptionPlan] = useState('Basic'); // Example: User subscription plan

//   // Fetch chat history (mock API call)
//   const fetchChatHistory = async () => {
//     try {
//       const response = await axios.get(`/api/chat/history/${userId}`);
//       setChatHistory(response.data.chats);
//       setFilteredChats(response.data.chats);
//     } catch (error) {
//       console.error('Error fetching chat history:', error);
//     }
//   };

//   // Handle chat filtering by date range and search term
//   const handleFilterChats = () => {
//     const filtered = chatHistory.filter(chat => {
//       const chatDate = new Date(chat.timestamp);
//       const inDateRange = (!startDate || chatDate >= startDate) && (!endDate || chatDate <= endDate);
//       const containsSearchTerm = chat.message.toLowerCase().includes(searchTerm.toLowerCase());
//       return inDateRange && containsSearchTerm;
//     });
//     setFilteredChats(filtered);
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchChatHistory();
//     }
//   }, [userId]);

//   useEffect(() => {
//     handleFilterChats();
//   }, [startDate, endDate, searchTerm]);

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString(undefined, {
//       weekday: 'short',
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   const formatTime = (date) => {
//     return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   const isNewDay = (prevDate, currDate) => {
//     const prev = new Date(prevDate).setHours(0, 0, 0, 0);
//     const curr = new Date(currDate).setHours(0, 0, 0, 0);
//     return prev !== curr;
//   };

//   const sidebarItems = [
//     { id: 'chatHistory', label: 'Chat History', icon: <Chat className={styles.icon} /> },
//     { id: 'liveChat', label: 'Live Chat', icon: <Forum className={styles.icon} /> },
//     { id: 'settings', label: 'Settings', icon: <Settings className={styles.icon} /> },
//   ];

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <div className={styles.dashboardPage}>
//         <Greeting />

//         {/* Sidebar */}
//         <div className={styles.sidebar}>
//           {sidebarItems.map(item => (
//             <div
//               key={item.id}
//               className={`${styles.sidebarItem} ${activeSection === item.id ? styles.active : ''}`}
//               onClick={() => setActiveSection(item.id)}
//             >
//               {item.icon}
//               <span>{item.label}</span>
//             </div>
//           ))}
//         </div>

//         {/* Main Content */}
//         <div className={styles.mainContent}>
//           {activeSection === 'chatHistory' && (
//             <>
//               <h1 className={styles.title}>Chat History</h1>
//               <div className={styles.filters}>
//                 <DatePicker
//                   label="Start Date"
//                   value={startDate}
//                   onChange={(newValue) => setStartDate(newValue)}
//                   renderInput={(params) => <TextField {...params} className={styles.datePicker} />}
//                 />
//                 <DatePicker
//                   label="End Date"
//                   value={endDate}
//                   onChange={(newValue) => setEndDate(newValue)}
//                   renderInput={(params) => <TextField {...params} className={styles.datePicker} />}
//                 />
//                 <TextField
//                   type="text"
//                   label="Search by message"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className={styles.searchInput}
//                 />
//               </div>
//               <div className={styles.chatHistory}>
//                 {filteredChats.length ? (
//                   filteredChats.map((chat, index) => (
//                     <React.Fragment key={chat._id}>
//                       {index === 0 || isNewDay(filteredChats[index - 1].timestamp, chat.timestamp) ? (
//                         <div className={styles.dateDivider}>{formatDate(chat.timestamp)}</div>
//                       ) : null}
//                       {/* <div className={chat.userId === userId ? styles.userChat : styles.botChat}> */}
//                         <div className={styles.userChat}>
//                           <div className={styles.bubble}>
//                             <p>{chat.message}</p>
//                             <span className={styles.timestamp}>{formatTime(chat.timestamp)}</span>
//                           </div>
//                         </div>
//                         <div className={styles.botChat}>
//                           <div className={styles.bubble}>
//                             <p>{chat.botResponse}</p>
//                             <span className={styles.timestamp}>{formatTime(chat.timestamp)}</span>
//                           </div>
//                         </div>
                        
//                       {/* </div> */}
//                     </React.Fragment>
//                   ))
//                 ) : (
//                   <div>No chat history found</div>
//                 )}
//               </div>
//             </>
//           )}

//           {activeSection === 'liveChat' && (
//             <div className={styles.liveChat}>
//               <h1 className={styles.title}>Live Chat</h1>
//               <p>This is where users will be able to access live chatbot support.</p>
//               {/* Implement Live Chat functionality here */}
//             </div>
//           )}

//           {activeSection === 'settings' && (
//             <div className={styles.settings}>
//               <h1 className={styles.title}>Account Settings</h1>
//               <div className={styles.accountSettings}>
//                 <div>
//                   <label>Email: </label>
//                   <input type="email" value={user.email} readOnly />
//                 </div>
//                 <div>
//                   <label>Password: </label>
//                   <button className={styles.changePasswordButton} onClick={() => alert('Change Password')}>
//                     Change Password
//                   </button>
//                 </div>
//                 <div className={styles.subscriptionInfo}>
//                   <div><strong>Subscription Tier:</strong> {subscriptionPlan}</div>
//                   <button className={styles.upgradeButton} onClick={() => alert('Upgrade to a higher plan!')}>
//                     Upgrade Plan
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </LocalizationProvider>
//   );
// };

// export default UserDashboard;
