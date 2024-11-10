import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOpenIcon from "@mui/icons-material/LockOpen"; // Icon for a modern touch
import styles from "./styles/Login.module.css";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUpSwitch = () => {
    navigate("/signup");
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.overlay}></div> {/* Background overlay */}
      <div className={styles.loginContainer}>
        <LockOpenIcon className={styles.icon} />
        <Typography variant="h4" className={styles.title}>
          Welcome Back
        </Typography>
        {errorMessage && (
          <Alert severity="error" className={styles.errorMessage}>
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit} className={styles.loginForm}>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={styles.submitButton}
          >
            Login
          </Button>
          <Typography variant="body2" className={styles.signupLink}>
            Don’t have an account?{" "}
            <a onClick={handleSignUpSwitch} className={styles.signupAnchor}>
              Sign Up
            </a>
          </Typography>
        </form>
      </div>
    </div>
  );
};

export default Login;



// import React, { useState } from "react";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import {
//   TextField,
//   Button,
//   Typography,
//   InputAdornment,
//   IconButton,
//   Alert // Added for showing an error message
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import styles from './styles/Login.module.css'; // Importing the modular CSS
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   const apiUrl = process.env.REACT_APP_API_BASE_URL;

//   const navigate = useNavigate();
//   const {login} = useAuth();
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState(""); // Added for error message handling

//   const handleSignUpSwitch = () => {
//     navigate('/signup');
//   }

//   const handleClickShowPassword = () => setShowPassword(!showPassword);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try{
//       await login(email, password);
//       navigate('/');
//     }catch(err){
//       setErrorMessage("An error occurred. Please try again later.");
//     }
//   };
//   // const handleSubmit = async (event) => {
//   //   event.preventDefault();
//   //   try {
//   //     const loginResponse = await axios.post('/api/user/signIn', { email, password });
//   //     if (loginResponse.data.status) {
//   //       // login successful
//   //       localStorage.setItem('token', loginResponse.data.token);
//   //       localStorage.setItem('userId', loginResponse.data.user._id);
//   //       navigate('/');
//   //     } else {
//   //       // login failed, show error message
//   //       setErrorMessage("Login failed. Please check your email and password.");
//   //     }
//   //   } catch (error) {
//   //     // handle potential server errors
//   //     setErrorMessage("An error occurred. Please try again later.");
//   //   }
//   // };

//   return (
//     <div className={styles.loginPage}>
//       <div className={styles.loginContainer}>
//         <Typography variant="h4" className={styles.title}>
//           Welcome Back
//         </Typography>
//         {/* Conditional rendering of error message */}
//         {errorMessage && (
//           <Alert severity="error" className={styles.errorMessage}>
//             {errorMessage}
//           </Alert>
//         )}
//         <form onSubmit={handleSubmit} className={styles.loginForm}>
//           <TextField
//             label="Email"
//             type="email"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className={styles.inputField}
//             required
//           />
//           <TextField
//             label="Password"
//             type={showPassword ? "text" : "password"}
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className={styles.inputField}
//             required
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                     edge="end"
//                   >
//                     {showPassword ? <Visibility /> : <VisibilityOff />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             className={styles.submitButton}
//           >
//             Login
//           </Button>
//           <Typography variant="body2" className={styles.signupLink}>
//             Don’t have an account?{" "}
//             <a onClick={handleSignUpSwitch} className={styles.signupAnchor}>
//               Sign Up
//             </a>
//             {/* <a href="/signup" className={styles.signupAnchor}>
//               Sign Up
//             </a> */}
//           </Typography>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
