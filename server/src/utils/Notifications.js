// implement the sendEmail function usinf nodemailer

import nodemailer from "nodemailer";

const sendEmail = async (emails, subject, html, text) => {
  const emailIds = emails.join(", ");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: emailIds,
    subject,
    text,
    html,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email: " + error.message);
      return false;
    }
    console.log("Email sent: " + info.response);
  });

  return true;
};

export default sendEmail;
