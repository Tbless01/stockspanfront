const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ayomitobi1@gmail.com",
    pass: "zxvlhnofstjjzlbg",
  },
});

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const info = await transporter.sendMail({
      from: email,
      to: "ayomitobi1@gmail.com",
      subject: `New Message from ${name} (${email})`,
      text: message,
    });

    console.log("Email sent:", info.messageId);
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to send email. Please try again later.",
      });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
