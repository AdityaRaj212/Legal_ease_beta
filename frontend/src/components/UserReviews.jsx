import React, { useState, useEffect } from 'react';
import styles from './styles/UserReviews.module.css';
import { Star, ChevronLeft, ChevronRight } from '@mui/icons-material';

const UserReviews = () => {
  const reviews = [
    {
      name: "John Doe",
      rating: 5,
      feedback: "LegalEase has been a lifesaver! The chatbot provides accurate, useful advice. Highly recommended!",
    },
    {
      name: "Jane Smith",
      rating: 4,
      feedback: "I was impressed by how easy it is to get advice. This platform is quick and efficient!",
    },
    {
      name: "Robert Johnson",
      rating: 5,
      feedback: "A must-have for anyone in need of legal advice. It’s user-friendly and very helpful.",
    },
    {
      name: "Emily Davis",
      rating: 4,
      feedback: "Great service! Helped me understand my rights better and gave clear next steps.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const handleNext = () => {
    setAnimate(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      setAnimate(false);
    }, 300);
  };

  const handlePrev = () => {
    setAnimate(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
      setAnimate(false);
    }, 300);
  };

  return (
    <section className={styles.reviewsSection}>
      <h2 className={styles.title}>What Our Users Say</h2>
      <div className={styles.reviewContainer}>
        <button className={styles.arrowButton} onClick={handlePrev}>
          <ChevronLeft />
        </button>
        
        <div className={`${styles.reviewCard} ${animate ? styles.fadeIn : ''}`}>
          <h3 className={styles.name}>{reviews[currentIndex].name}</h3>
          <div className={styles.rating}>
            {Array.from({ length: reviews[currentIndex].rating }).map((_, index) => (
              <Star key={index} className={styles.star} />
            ))}
          </div>
          <p className={styles.feedback}>"{reviews[currentIndex].feedback}"</p>
        </div>
        
        <button className={styles.arrowButton} onClick={handleNext}>
          <ChevronRight />
        </button>
      </div>
    </section>
  );
};

export default UserReviews;
