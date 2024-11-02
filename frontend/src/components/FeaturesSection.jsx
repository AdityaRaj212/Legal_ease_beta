import React from 'react';
import './styles/FeaturesSection.css';

function FeaturesSection() {
  return (
    <div id="features-section" className="features">
      <h2>Key Features</h2>
      <div className="features-container">
        <div className="feature-card">
          <h3>Grievance Listening</h3>
          <p>The chatbot listens carefully to the user's grievances.</p>
        </div>
        <div className="feature-card">
          <h3>Legal Suggestions</h3>
          <p>Provides suggestions based on IPCs and past court hearings.</p>
        </div>
        <div className="feature-card">
          <h3>Chat History</h3>
          <p>Keeps a record of all user interactions for future reference.</p>
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;
