import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to fetch user info from the API
    const fetchUser = async (token) => {
        try {
            const response = await axios.get(`${apiUrl}/api/user/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data.user);
        } catch (error) {
            console.error('Error fetching user:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // On first load, check if there's a token and try to fetch the user
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Fetch the user if the token is available
            fetchUser(token);
        } else {
            setLoading(false);
        }
    }, []);

    // Login function
    const login = async (email, password) => {
        setLoading(true); // Start loading while login request is being processed
        try {
            const response = await axios.post(`${apiUrl}/api/user/signIn`, { email, password });
            const { token, user } = response.data;
            console.log(response);

            // Store token in localStorage and update user
            localStorage.setItem('token', token);
            localStorage.setItem('userId', user._id);
            setUser(user);
        } catch (error) {
            console.error('Login error:', error);
            setUser(null);
        } finally {
            setLoading(false); // Stop loading when login process is complete
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUser(null);
        window.location.reload(); // Reload the page after logging out
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Check if the user is logged in (e.g., check localStorage for token)
//         const token = localStorage.getItem('token');
//         console.log('token: ', token);
//         if (token) {
//             axios.get('/api/user/me', {
//                 headers: { Authorization: `Bearer ${token}` }
//             })
//             .then(response => {
//                 setUser(response.data.user)
//         })
//             .catch(() => setUser(null))
//             .finally(() => setLoading(false));
//         } else {
//             setLoading(false);
//         }
//     }, []);

//     const login = async (username, password) => {
//         const response = await axios.post('/api/login', { username, password });
//         localStorage.setItem('token', response.data.token);
//         setUser(response.data.user);
//     };

//     const logout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('userId');
//         setUser(null);
//         window.location.reload();
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout, loading }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);
