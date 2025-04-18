import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

export default function Contact() {
  const form = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Basic email validation
    const email = e.target.user_email.value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setShowPopup(true);
      form.current.reset();
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      setError(error.text || 'Failed to send message. Please try again later.');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Get in Touch</h1>
        <p>I'd love to hear from you! Whether you have a project in mind, want to collaborate, or just want to say hello, feel free to reach out.</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <input 
            type="text" 
            name="user_name" 
            placeholder="Your Name" 
            required 
            disabled={isSubmitting}
          />
          <input 
            type="email" 
            name="user_email" 
            placeholder="Your Email" 
            required 
            disabled={isSubmitting}
          />
          <select 
            name="interest_type" 
            disabled={isSubmitting}
            className="interest-select"
          >
            <option value="">What brings you here today?</option>
            <option value="collaboration">Project Collaboration</option>
            <option value="feedback">Feedback/Suggestions</option>
            <option value="inquiry">General Inquiry</option>
            <option value="hello">Just saying hello</option>
          </select>
          <textarea 
            name="message" 
            placeholder="Your Message..." 
            rows="5" 
            required 
            disabled={isSubmitting}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h2>Thank You! ✨</h2>
            <p>I truly appreciate you reaching out. I've received your message and will get back to you soon.</p>
            <p>In the meantime, feel free to explore more of my work!</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

