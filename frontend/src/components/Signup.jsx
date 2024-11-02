import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert // Added for showing an error message
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from './styles/Signup.module.css'; // Importing the modular CSS

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Added for error message handling

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleLoginSwitch = () => {
    navigate('/login')
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    try {
      console.log(userName, email, password);
      const signupResponse = await axios.post('/api/user/signUp', { userName, email, password });
      if (signupResponse.data.status) {
        // signup successful
        navigate('/login');
      } else {
        // signup failed, show error message
        setErrorMessage("Signup failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.signupContainer}>
        <Typography variant="h4" className={styles.title}>
          Create an Account
        </Typography>
        {/* Conditional rendering of error message */}
        {errorMessage && (
          <Alert severity="error" className={styles.errorMessage}>
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit} className={styles.signupForm}>
          <TextField
            label="Username"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={styles.inputField}
            required
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
            required
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.inputField}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={styles.submitButton}
          >
            Sign Up
          </Button>
          <Typography variant="body2" className={styles.loginLink}>
            Already have an account?{" "}
            <a onClick={handleLoginSwitch} className={styles.loginAnchor}>
              Login
            </a>
          </Typography>
        </form>
      </div>
    </div>
  );
};

export default Signup;
