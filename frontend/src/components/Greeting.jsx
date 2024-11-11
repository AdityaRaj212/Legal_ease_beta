import React, { useState, useEffect, useRef } from 'react';
import styles from './styles/Greeting.module.css';
import { useAuth } from '../context/AuthContext';
import Loading from './Loading';
import { Person, ExitToApp, AttachMoney, Dashboard, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { GoLaw } from "react-icons/go";

const Greeting = () => {
    const { user, loading, logout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false); // Track if the user has scrolled down
    const modalRef = useRef(null);
    const [loadedUser, setLoadedUser] = useState(null);
    const navigate = useNavigate();

    const initial = loadedUser?.userName ? loadedUser.userName.charAt(0).toUpperCase() : loadedUser?.email?.charAt(0).toUpperCase();

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleLogout = () => {
        logout();
        setIsModalOpen(false);
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);

    useEffect(() => {
        if (!loading && user) {
            setLoadedUser(user);
        }
    }, [loading, user]);

    useEffect(() => {
        if (!loading && !user) {
            setLoadedUser(null);
        }
    }, [loading, user]);

    const handleSwitchToUserProfile = () => {
        navigate('/dashboard');
    };

    const handleSwitchToOnboarding = () => {
        navigate('/statistics');
    };

    // Scroll event listener to detect when user starts scrolling
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true); // Apply the translucent effect
            } else {
                setIsScrolled(false); // Remove the translucent effect
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (loading) return <Loading />;

    if (!loadedUser){
        return (
            <div className={`${styles.greetingContainer} ${isScrolled ? styles.scrolled : ''}`}>
                <div className={styles.option} onClick={() => navigate('/')}>
                    <Home className={styles.icon} />
                    <span className={styles.text}>Home</span>
                </div>
                <div className={styles.optionsContainer}>
                    <button className={styles.resourcesButton} onClick={() => navigate('/legal-resources')}>
                        Explore Legal Resources
                    </button>
                </div>
            </div>
        );
    }
    // if (!loadedUser) return null;

    return (
        <div className={`${styles.greetingContainer} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.option} onClick={() => navigate('/')}>
                <Home className={styles.icon} />
                <span className={styles.text}>Home</span>
            </div>
            <div className={styles.optionsContainer}>
                <div className={styles.option} onClick={() => navigate('/dashboard')}>
                    <Dashboard className={styles.icon} />
                    <span className={styles.text}>Dashboard</span>
                </div>
                <div className={styles.option} onClick={() => navigate('/pricing')}>
                    <AttachMoney className={styles.icon} />
                    <span className={styles.text}>Pricing</span>
                </div>
                <button className={styles.resourcesButton} onClick={() => navigate('/legal-resources')}>
                    Explore Legal Resources
                </button>
                <div className={styles.profileCircle} onClick={toggleModal}>
                    {initial}
                </div>
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div ref={modalRef} className={styles.modal}>
                        <button className={styles.modalButton} onClick={handleSwitchToUserProfile}>
                            <Person className={styles.icon} />
                            <span className={styles.text}>User Profile</span>
                        </button>
                        <button className={styles.modalButton} onClick={handleSwitchToOnboarding}>
                            <GoLaw className={styles.icon}/>
                            <span className={styles.text}>Lawyer Onboarding</span>
                        </button>
                        <button className={styles.modalButton} onClick={handleLogout}>
                            <ExitToApp className={styles.icon} />
                            <span className={styles.text}>Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Greeting;


// import React, { useState, useEffect, useRef } from 'react';
// import styles from './styles/Greeting.module.css';
// import { useAuth } from '../context/AuthContext';
// import Loading from './Loading';
// import { Person, ExitToApp, AttachMoney, Dashboard, Home } from '@mui/icons-material'; // Icons
// import { useNavigate } from 'react-router-dom'; // For navigation

// const Greeting = () => {
//     const { user, loading, logout } = useAuth();
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const modalRef = useRef(null);
//     const [loadedUser, setLoadedUser] = useState(null);
//     const navigate = useNavigate(); // For navigation

//     // Get the user's first initial
//     const initial = loadedUser?.userName ? loadedUser.userName.charAt(0).toUpperCase() : loadedUser?.email?.charAt(0).toUpperCase();

//     const toggleModal = () => {
//         setIsModalOpen(!isModalOpen);
//     };

//     const handleLogout = () => {
//         logout();
//         setIsModalOpen(false);
//     };

//     // Close the modal when clicking outside of it
//     const handleClickOutside = (event) => {
//         if (modalRef.current && !modalRef.current.contains(event.target)) {
//             setIsModalOpen(false);
//         }
//     };

//     useEffect(() => {
//         if (isModalOpen) {
//             document.addEventListener('mousedown', handleClickOutside);
//         } else {
//             document.removeEventListener('mousedown', handleClickOutside);
//         }

//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isModalOpen]);

//     // New useEffect to handle first-time load for user
//     useEffect(() => {
//         if (!loading && user) {
//             setLoadedUser(user); // Set the loaded user once available
//         }
//     }, [loading, user]);

//     // Use a fallback for loading in case user takes longer to load or is null on the first try
//     useEffect(() => {
//         if (!loading && !user) {
//             setLoadedUser(null); // If there's no user data after loading, clear the user state
//         }
//     }, [loading, user]);

//     const handleSwitchToUserProfile = ()=>{
//         navigate('/dashboard');
//     }

//     if (loading) return <Loading />; // Still loading

//     if (!loadedUser) return null; // No user data available

//     return (
//         <div className={styles.greetingContainer}>
//             {/* Company Icon (Click to navigate home) */}
//             <div className={styles.option} onClick={() => navigate('/')}>
//                 <Home className={styles.icon} />
//                 <span className={styles.text}>Home</span>
//             </div>


//             <div className={styles.optionsContainer}>
//                 <div className={styles.option} onClick={() => navigate('/dashboard')}>
//                     <Dashboard className={styles.icon} />
//                     <span className={styles.text}>Dashboard</span>
//                 </div>
//                 <div className={styles.option} onClick={() => navigate('/pricing')}>
//                     <AttachMoney className={styles.icon} />
//                     <span className={styles.text}>Pricing</span>
//                 </div>
//                 <button className={styles.resourcesButton} onClick={() => navigate('/legal-resources')}>
//                     Explore Legal Resources
//                 </button>
//             </div>
            
//             {/* Profile Circle and Options */}
//             <div className={styles.profileCircle} onClick={toggleModal}>
//                 {initial}
//             </div>

//             {isModalOpen && (
//                 <div className={styles.modalOverlay}>
//                     <div ref={modalRef} className={styles.modal}>
//                         <button className={styles.modalButton} onClick={handleSwitchToUserProfile}>
//                             <Person className={styles.icon} />
//                             <span className={styles.text}>User Profile</span>
//                         </button>
//                         <button className={styles.modalButton} onClick={handleLogout}>
//                             <ExitToApp className={styles.icon} />
//                             <span className={styles.text}>Logout</span>
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Greeting;
