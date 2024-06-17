import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendOTPToVerify = (req, res, email) => {
  const otp = Math.floor(100000 + Math.random() * 900000);

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "OTP for verifying your account",
    html: `<p>Your OTP is <b>${otp}</b> expires in 30 minutes</p>`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        reject(new Error("Email could not be sent"));
      } else {
        resolve(otp);
      }
    });
  });
};

const sendOTPToRestPassword = (req, res, email) => {
  const otp = Math.floor(100000 + Math.random() * 900000);

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "OTP for reset your account password",
    html: `<p>Your OTP is <b>${otp}</b> expires in 5 minutes</p>`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        reject(new Error("Email could not be sent"));
      } else {
        resolve(otp);
      }
    });
  });
};

export { transporter, sendOTPToVerify, sendOTPToRestPassword };
