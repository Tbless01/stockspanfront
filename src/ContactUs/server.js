const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3000; 

app.use(express.json());
app.use(cors());


app.post('/send-email', (req, res) => {
  const { fullname, email, message } = req.body;

  // Set up nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ayomitobi1@gmail.com', 
      pass: 'zxvlhnofstjjzlbg', 
    },
  });

  // Mail options
  const mailOptions = {
    from: 'your_email@gmail.com',
    to: 'ayomitobi1@gmail.com',
    subject: 'New Contact Form was Submitted',
    html: `
      <h2>Contact Form Submission</h2>
      <p><strong>Name:</strong> ${fullname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send email.' });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ message: 'Email sent successfully.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
