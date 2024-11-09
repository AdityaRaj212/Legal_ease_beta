import React, { useState, useEffect } from 'react';
import { ChatBubbleOutline } from '@mui/icons-material';
import styles from './styles/ChatbotPrompt.module.css';
import { useNavigate } from 'react-router-dom';

const ChatbotPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(true);

  const navigate = useNavigate();

  // Timer to show and hide the prompt every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowPrompt(prev => !prev);
    }, 7000); // Adjust this timing as needed

    return () => clearInterval(interval);
  }, []);

  const handleClick = ()=>{
    navigate('/dashboard');
  }

  return (
    <div className={`${styles.promptContainer} ${showPrompt ? styles.fadeIn : styles.fadeOut}`} onClick={handleClick}>
      <div className={styles.innerCard}>
        <div className={styles.iconContainer}>
          <ChatBubbleOutline className={styles.icon} />
        </div>
        <div className={styles.textContainer}>
          <h3>Have Legal Questions?</h3>
          <p>Get quick answers to all your legal concerns! Tap this prompt to start chatting.</p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPrompt;
