import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Chatbot from './components/Chatbot';
import Profile from './components/Profile';
import { AuthProvider } from './context/AuthContext';
import PricingPlans from './pages/PricingPlans';
import UserDashboard from './pages/UserDashboard';
import LegalResourcesPage from './pages/LegalResources';
import Statistics from './pages/Statistics';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element = {<Home />} />
          <Route path="/login" element = {<Login />} />
          <Route path="/signup" element = {<Signup />} />
          <Route path="/profile" element = {<Profile/>} />
          <Route path="/pricing" element = {<PricingPlans/>} />
          <Route path="/dashboard" element = {<UserDashboard/>} />
          <Route path="/legal-resources" element = {<LegalResourcesPage/>} />
          <Route path="/statistics" element={<Statistics/>} />
        </Routes>
          {/* <Chatbot/> */}
      </Router> 
    </AuthProvider>
  );
}

export default App;
