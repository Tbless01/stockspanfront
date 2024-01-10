import React, { useState } from 'react';
import axios from '../../api/axios';

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    fromEmail: '',
    toEmail: 'ayomitobi1@gmail.com',
    subject: '',
    body: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/contact', formData);
      console.log('Message Sent:', response.data.message);
      setFormData({
        fromEmail: '',
        toEmail: 'ayomitobi1@gmail.com',
        subject: '',
        body: '',
      });
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>From Email:</label>
          <input
            type="email"
            name="fromEmail"
            value={formData.fromEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

