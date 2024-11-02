import React, { useState } from "react";
//import { FaUserAlt, FaPencilAlt } from "react-icons/fa"; 
import "./styles/Profile.css"; 

//import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaHome } from 'react-icons/fa';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [houseNo, setHouseNo] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, email, password, mobile, houseNo });
    setNotification('Profile updated successfully!');
    setTimeout(() => {
      setNotification('');
    }, 3000);

    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <form onSubmit={handleSubmit}>
        <div className="profile-photo">
          <img src="/images/profile.jpg" alt="Profile" />
          <button type="button" className="edit-photo">Edit</button>
        </div>

        <div className="profile-field">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? 'editable' : ''}
          />
          <button type="button" className="edit-icon" onClick={() => setIsEditing(true)}>
            <FaUser />
          </button>
        </div>

        <div className="profile-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? 'editable' : ''}
          />
          <button type="button" className="edit-icon" onClick={() => setIsEditing(true)}>
            <FaEnvelope />
          </button>
        </div>

        <div className="profile-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? 'editable' : ''}
          />
          <button type="button" className="edit-icon" onClick={() => setIsEditing(true)}>
            <FaLock />
          </button>
        </div>

        <div className="profile-field">
          <label>Mobile Number</label>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? 'editable' : ''}
          />
          <button type="button" className="edit-icon" onClick={() => setIsEditing(true)}>
            <FaPhone />
          </button>
        </div>

        <div className="profile-field">
          <label>Address</label>
          <input
            type="text"
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? 'editable' : ''}
          />
          <button type="button" className="edit-icon" onClick={() => setIsEditing(true)}>
            <FaHome />
          </button>
        </div>

        {/* <div className="profile-field">
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? 'editable' : ''}
          />
          <button type="button" className="edit-icon" onClick={() => setIsEditing(true)}>
            <FaCity />
          </button>
        </div>

        <div className="profile-field">
          <label>State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? 'editable' : ''}
          />
          <button type="button" className="edit-icon" onClick={() => setIsEditing(true)}>
            <FaCity />
          </button>
        </div> */}

        <button type="submit" className={`submit-button ${isEditing ? 'active' : ''}`}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
