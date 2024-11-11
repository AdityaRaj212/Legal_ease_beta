import React from "react";
import { FaUserTie, FaUsers, FaQuestionCircle, FaChartLine, FaUserCheck, FaHourglass } from "react-icons/fa";
import "./styles/Statistics.css";
import Greeting from "../components/Greeting";

const Statistics = () => {
  return (
    <div>

        <Greeting/>
        <div className="page-container">
        {/* Header Section */}
        <header className="header">
            <h1>Trusted Legal Assistance Platform</h1>
            <p>Connecting clients with experienced legal professionals</p>
        </header>

        {/* Statistics Section */}
        <div className="stats-container">
            <h2>Platform Insights</h2>
            <div className="stats-grid">
            <div className="stat-item">
                <FaUsers size={40} className="icon" />
                <h3>Customers Served</h3>
                <p>Over 1,500 individuals have found solutions to their legal issues with us.</p>
            </div>
            <div className="stat-item">
                <FaUserTie size={40} className="icon" />
                <h3>On-boarded Lawyers</h3>
                <p>Join 120 qualified lawyers who are part of our dedicated team.</p>
            </div>
            <div className="stat-item">
                <FaQuestionCircle size={40} className="icon" />
                <h3>Questions Asked Today</h3>
                <p>85 questions answered, ensuring clients get timely advice.</p>
            </div>
            <div className="stat-item">
                <FaChartLine size={40} className="icon" />
                <h3>Total Questions</h3>
                <p>Our platform has resolved over 3,400 legal queries to date.</p>
            </div>
            <div className="stat-item">
                <FaUserCheck size={40} className="icon" />
                <h3>Active Users</h3>
                <p>Serving 300 active users daily to provide seamless legal support.</p>
            </div>
            </div>
        </div>

        {/* Join Us Section */}
        <div className="join-container">
            <h2>Become a Legal Partner</h2>
            <p>Join our network of experts and make a difference by helping clients with their legal needs.</p>
            <button className="join-button">Register Now</button>
        </div>
        </div>
    </div>
  );
};

export default Statistics;