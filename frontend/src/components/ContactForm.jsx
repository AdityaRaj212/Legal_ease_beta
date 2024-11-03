import React, { useState } from 'react';
import axios from 'axios';
import { ReactTyped } from 'react-typed';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/ContactForm.css';

const ContactForm = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('/api/user/store', {email});
      console.log(response.data);
      if (response.status === 201) {
        // alert('Thanks for signing up!');
        toast.success(`🎉 Thank You for Signing Up!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      } else if (response.status === 409) {
          // alert('This email is already registered.');
          toast.warning(`This email is already registered.`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
      } else {
          // alert('Failed to sign up. Please try again later.');
          toast.danger(`Failed to sign up. Please try again later.`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
      }
    }catch(err){
      console.log(err);
      // alert('An error occurred. Please try again later.');
      toast.warn(`An error occurred. Please try again later.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    }
  };

  return (
    <section className="contact" id="contact">
      {/* <h2>Stay Updated</h2> */}
      <h2>
        <ReactTyped
          strings={['Sign up to be the first to know when we launch!']}
          typeSpeed={50}
          backSpeed={30}
          loop
        />
      </h2>
      <div className='contact-container'>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Notify Me</button>
        </form>
      </div>
      <ToastContainer />

      <div className="contact-info">
        <h3>Contact Us</h3>
        <p><strong>Email:</strong> legalEase@gmail.com</p>
        {/* <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/adityaraj212" target="_blank" rel="noopener noreferrer">linkedin.com/in/adityaraj212</a></p> */}
        <p><strong>GitHub:</strong> <a href="https://github.com/AdityaRaj212/LegalEase" target="_blank" rel="noopener noreferrer">github.com/AdityaRaj212</a></p>
      </div>

    </section>
  );
};

export default ContactForm;
