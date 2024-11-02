import React from 'react';
import './styles/DescriptionSection.css';

const DescriptionSection = () => {
  return (
    <section className="description-section">
      <div className="description-container">
        <h2>About Our Legal Advice Chatbot</h2>
        <p>
          Our AI-powered legal advice chatbot is designed to listen to your grievances and provide the most appropriate solutions based on the Indian Penal Code (IPC) and past court rulings. It also saves chat history for future reference, ensuring you always have access to previous advice.
        </p>
      </div>
    </section>
  );
};

export default DescriptionSection;
