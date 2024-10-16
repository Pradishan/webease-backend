import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Use `true` for port 465, `false` for other ports
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

const sendOTP = (req, res, email, subject, otpExpiration, otpType) => {
  const otp = generateOTP();

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: subject,
    html: `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>OTP Notification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f7;
        color: #333333;
        margin: 0;
        padding: 0;
        width: 100%;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: none;
        height: 100% !important;
        line-height: 100% !important;
      }

      .email-wrapper {
        width: 100%;
        background-color: #f4f4f7;
        padding: 20px;
      }

      .email-content {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .email-header {
        text-align: center;
        background-color: #3a66ff;
        padding: 20px 0;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }

      .email-header h2 {
        color: white;
        font-size: 24px;
        margin: 0;
      }

      .email-header h3 {
        color: white;
        font-size: 12px;
        margin: 0;
      }

      .email-body {
        padding: 20px;
        text-align: center;
      }

      .email-body h1 {
        font-size: 22px;
        color: #333333;
        margin-bottom: 20px;
      }

      .email-body p {
        font-size: 16px;
        color: #555555;
        margin-bottom: 20px;
      }

      .otp-code {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 30px;
      }

      .otp-digit {
        display: inline-block;
        background-color: #fff;
        color: #333;
        padding: 15px 20px;
        font-size: 18px;
        letter-spacing: 2px;
        border-radius: 5px;
        border: 2px solid #3a66ff;
        width: 20px;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .email-footer {
        text-align: center;
        padding: 10px;
        font-size: 12px;
        color: #aaaaaa;
      }

      .email-footer p {
        margin: 0;
      }

      .autogen-note {
        color: #888888;
        font-size: 12px;
        margin-top: 30px;
      }

      @media only screen and (max-width: 600px) {
        .email-content {
          padding: 15px;
          width: 100%;
        }

        .otp-code {
          gap: 8px;
        }

        .otp-digit {
          padding: 10px 15px;
          width: 35px;
        }

        .email-header h2 {
          font-size: 20px;
        }

        .email-body h1 {
          font-size: 18px;
        }

        .email-body p {
          font-size: 14px;
        }

        .button {
          padding: 10px 15px;
          font-size: 14px;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-wrapper">
      <div class="email-content">
        <div class="email-header">
          <h2>${
            otpType === "verify" ? "Account Verification" : "Password Reset"
          }</h2>
        </div>
        <div class="email-body">
          <h1>Your OTP Code</h1>
          <p>Your OTP is:</p>
          <div class="otp-code">
            <div class="otp-digit">${otp.toString()[0]}</div>
            <div class="otp-digit">${otp.toString()[1]}</div>
            <div class="otp-digit">${otp.toString()[2]}</div>
            <div class="otp-digit">${otp.toString()[3]}</div>
            <div class="otp-digit">${otp.toString()[4]}</div>
            <div class="otp-digit">${otp.toString()[5]}</div>
          </div>
          <p>This OTP will expire in ${otpExpiration} minutes.</p>
          <p>
            Please use this code to ${
              otpType === "verify" ? "verify your account" : "reset your password"
            }.
          </p>
        </div>
        <div class="email-footer">
          <p>If you didn't request this, please ignore this email.</p>
          <p>For any issues, feel free to contact us.</p>
        </div>
        <div class="email-footer">
          <p class="autogen-note">
            This email was automatically generated. Please do not reply.
          </p>
        </div>
        <div class="email-header">
          <h3>Powered by WebEase</h3>
        </div>
      </div>
    </div>
  </body>
</html>
    `,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        console.log({ email: email });
        reject(new Error("Email could not be sent"));
      } else {
        resolve(otp);
      }
    });
  });
};

// Function to send OTP for account verification
const sendOTPToVerify = (req, res, email) => {
  return sendOTP(
    req,
    res,
    email,
    "OTP for verifying your account",
    30,
    "verify"
  );
};

// Function to send OTP for password reset
const sendOTPToRestPassword = (req, res, email) => {
  return sendOTP(
    req,
    res,
    email,
    "OTP for resetting your account password",
    5,
    "reset"
  );
};

export { transporter, sendOTPToVerify, sendOTPToRestPassword };
