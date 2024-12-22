import nodemailer from "nodemailer";

const testEmail = async () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_FROM, // Sender address
    to: "isaacngabirano@gmail.com", // Replace with your email to test
    subject: "Test Email from Nodemailer",
    text: "This is a test email to confirm Nodemailer works!",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

testEmail();
