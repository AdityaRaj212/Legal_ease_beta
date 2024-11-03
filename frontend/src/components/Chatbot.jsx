import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import styles from './styles/Chatbot.module.css'; // Import the module CSS

const Chatbot = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const { user, loading } = useAuth();
  const [chatLoading, setChatLoading] = useState(true);
  const [isChatVisible, setChatVisible] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const toggleChat = async () => {
    setChatVisible(!isChatVisible);
    if (!isChatVisible) {
      await fetchChatHistory(); // Fetch chat history when chat opens
    }
  };

  useEffect(()=>{
    if(user){
      fetchChatHistory();
    }
  },[])

  const fetchChatHistory = async () => {
    if(user && !loading){
      try {
        const response = await axios.get(`/api/chat/history/${user._id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setChatHistory(response.data.chats || []);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      } finally{
        setChatLoading(false);
      }
    }
  };

  const sendMessage = async () => {
    const userInput = document.getElementById('userInput').value;
    const messagesDiv = document.getElementById('messages');

    if (userInput.trim() !== "") {
      // Display user message in chatbox
      messagesDiv.innerHTML += `
        <div class="${styles.userMsg}">
          <p>You: ${userInput}</p>
        </div>
      `;

      document.getElementById('userInput').value = '';
      try {
        const response = await axios.post('/api/chat/chat', { message: userInput, userId: user._id }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });

        let botReply = response.status === 200 && response.data.message === 'Chat limit reached'
          ? 'Chat limit reached!'
          : response.data.message;

        messagesDiv.innerHTML += `
          <div class="${styles.botMsg}">
            <p>Bot: ${botReply}</p>
          </div>
        `;

        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
      } catch (error) {
        messagesDiv.innerHTML += `
          <div class="${styles.botMsg}">
            <p>Error: Couldn't send message. Please try again later.</p>
          </div>
        `;
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    if (isChatVisible) {
      const inputElement = document.getElementById('userInput');
      if (inputElement) {
        inputElement.addEventListener('keypress', handleKeyPress);
      }
      return () => {
        if (inputElement) {
          inputElement.removeEventListener('keypress', handleKeyPress);
        }
      };
    }
  }, [isChatVisible]);

  // if(loading || chatLoading){
  //   return (<loading/>);
  // }

  // if(chatLoading) return (<>Loading...</>)

  return (
    <div>
      {/* Chatbot Container */}
      {isChatVisible && (
        <div className={styles.chatContainer}>
          <div className={styles.chatHeader} onClick={toggleChat}>
            Chat with Us
          </div>
          <div className={styles.chatContent}>
            <div id="messages" className={styles.messages}>
              {chatHistory.map((chat, index) => (
                <div key={index}>
                  <div className={styles.userMsg}>
                    <p>You: {chat.message}</p>
                  </div>
                  <div className={styles.botMsg}>
                    <p>Bot: {chat.botResponse}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex' }}>
              <input type="text" id="userInput" className={styles.userInput} placeholder="Type a message..." />
              <button className={styles.sendBtn} onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}

      {/* Button to open/close the chatbot */}
      <button className={styles.openChatBtn} onClick={toggleChat}>
        Chat Now
      </button>
    </div>
  );
};

export default Chatbot;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import styles from './styles/Chatbot.module.css'; // Import the module CSS

// const Chatbot = () => {
//   const { user } = useAuth();
//   const [isChatVisible, setChatVisible] = useState(false);

//   const toggleChat = () => {
//     setChatVisible(!isChatVisible);
//   };

//   const sendMessage = async () => {
//     const userInput = document.getElementById('userInput').value;
//     const messagesDiv = document.getElementById('messages');

//     if (userInput.trim() !== "") {
//       // Display user message in chatbox
//       messagesDiv.innerHTML += `
//         <div class="${styles.userMsg}">
//           <p>You: ${userInput}</p>
//         </div>
//       `;

//       document.getElementById('userInput').value = '';
//       try {
//         const response = await axios.post('/api/chat/chat', { message: userInput, userId: user._id }, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,  
//           }
//         });

//         let botReply = response.status === 200 && response.data.message === 'Chat limit reached'
//           ? 'Chat limit reached!'
//           : response.data.message;

//         messagesDiv.innerHTML += `
//           <div class="${styles.botMsg}">
//             <p>Bot: ${botReply}</p>
//           </div>
//         `;

//         messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
//       } catch (error) {
//         messagesDiv.innerHTML += `
//           <div class="${styles.botMsg}">
//             <p>Error: Couldn't send message. Please try again later.</p>
//           </div>
//         `;
//       }
//     }
//   };

//   return (
//     <div>
//       {/* Chatbot Container */}
//       {isChatVisible && (
//         <div className={styles.chatContainer}>
//           <div className={styles.chatHeader} onClick={toggleChat}>
//             Chat with Us
//           </div>
//           <div className={styles.chatContent}>
//             <div id="messages" className={styles.messages}></div>
//             <div style={{ display: 'flex' }}>
//               <input type="text" id="userInput" className={styles.userInput} placeholder="Type a message..." />
//               <button className={styles.sendBtn} onClick={sendMessage}>Send</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Button to open/close the chatbot */}
//       <button className={styles.openChatBtn} onClick={toggleChat}>
//         Chat Now
//       </button>
//     </div>
//   );
// };

// export default Chatbot;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// //import './Chatbot.css';  

// const Chatbot = ({}) => {
//   const {user} = useAuth();
//   console.log(user);
//   const [isChatVisible, setChatVisible] = useState(false);

//   const toggleChat = () => {
//     setChatVisible(!isChatVisible);
//   };

//   const sendMessage = async () => {
//     const userInput = document.getElementById('userInput').value;
//     const messagesDiv = document.getElementById('messages');

//     if (userInput.trim() !== "") {
//       // Display user message in chatbox
//       messagesDiv.innerHTML += `
//         <div style="padding: 5px; background: #E0F7FA; border-radius: 5px; margin-bottom: 5px;">
//           <p style="margin: 0; color: #007BFF;">You: ${userInput}</p>
//         </div>
//       `;
      
//       document.getElementById('userInput').value = '';
//       try {
        
//         const response = await axios.post('/api/chat/chat', { message: userInput, userId: user._id }, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,  
//           }
//         });
//         console.log('try');
//         // const response = await axios.post('/api/chat/chat', { message: userInput });
        
       
//         // const botReply = "This is botresponse";
//         let botReply = '';
//         if(response.status===200 && response.data.message === 'Chat limit reached'){
//           botReply = 'Chat limit reached!';
//         }else{
//           botReply = response.data.message;
//         }

        
//         messagesDiv.innerHTML += `
//           <div style="padding: 5px; background: #F1F1F1; border-radius: 5px; margin-bottom: 5px;">
//             <p style="margin: 0; color: #000;">Bot: ${botReply}</p>
//           </div>
//         `;
        
//         messagesDiv.scrollTop = messagesDiv.scrollHeight;  // Scroll to the bottom

//       } catch (error) {//this is a darunammmm
//         console.error('Error during chat:', error);
//         console.log(error);
//         messagesDiv.innerHTML += `
//           <div style="padding: 5px; background: #F1F1F1; border-radius: 5px; margin-bottom: 5px;">
           
//             <p style="margin: 0; color: #000;">Error: Couldn't send message.Please try again later.</p> 
//           </div>
//         `;
//       }
//     }
//   };

//   return (
//     <div>
//       {/* Chatbot Container */}
//       {isChatVisible && (
//         <div
//           id="chatContainer"
//           style={{
//             position: 'fixed', 
//             bottom: '20px', 
//             right: '20px', 
//             width: '300px', 
//             zIndex: 1000, 
//             backgroundColor: '#e0e0e0b8', 
//             border: '1px solid #121212', 
//             borderRadius: '5px'
//           }}
//         >
//           <div
//             id="chatHeader"
//             onClick={toggleChat}
//             style={{
//               background: '#121212',
//               color: '#fff',
//               padding: '10px',
//               cursor: 'pointer',
//               borderRadius: '5px 5px 0 0'
//             }}
//           >
//             Chat with Us
//           </div>
//           <div
//             id="chatContent"
//             style={{
//               padding: '10px',
//               background: '#fff',
//               border: '1px solid #121212',
//               borderRadius: '0 0 5px 5px',
//             }}
//           >
//             <div id="messages" style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '10px' }}></div>
//             <input
//               type="text"
//               id="userInput"
//               placeholder="Type a message..."
//               style={{ width: 'calc(100% - 50px)', padding: '5px' }}
//             />
//             <button
//               onClick={sendMessage}
//               style={{ background: '#121212', color: '#fff', padding: '5px', border: 'none' }}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Button to open/close the chatbot */}
//       <button
//         id="openChatBtn"
//         onClick={toggleChat}
//         style={{
//           position: 'fixed',
//           bottom: '20px',
//           right: '20px',
//           backgroundColor: '#121212',
//           color: 'white',
//           borderRadius: '50%',
//           padding: '10px',
//           zIndex: 1000,
//         }}
//       >
//         Chat Now
//       </button>
//     </div>
//   );
// };

// export default Chatbot;
