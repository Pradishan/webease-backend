import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import TempUser from "../models/tempUser.js";
import User from "../models/user.model.js";
import UserOTPVerification from "../models/userOTPVerification.model.js";
import {
  sendOTPToRestPassword,
  sendOTPToVerify,
} from "../utils/emailFunction.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const signup = asyncMiddleware(async (req, res) => {
  const {
    username,
    email,
    password,
    gender,
    confirmPassword,
    role,
    phone,
    address,
  } = req.body;

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("The passwords are not matching");
  }

  const user = await User.findOne({ username });

  if (user) {
    res.status(400);
    throw new Error("The username is alrady exists");
  }

  const tempuser = await TempUser.findOne({ username });

  if (tempuser) {
    res.status(400);
    throw new Error("Try again after 30 minutes of your last attempt");
  }

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400);
    throw new Error("The Email is already exists");
  }

  const bodyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

  const otp = await sendOTPToVerify(req, res, email);

  const newUser = new TempUser({
    username,
    email,
    password,
    gender,
    profilePic: gender === "male" ? bodyProfilePic : girlProfilePic,
    phone,
    address,
    otp,
  });

  if (role) {
    newUser.role = role;
  }

  if (newUser) {
    await newUser.save();

    res.status(201).json({
      message: "User Registered successfully please verify your account",
      _id: newUser?._id,
    });
  } else {
    res.status(400);
    throw new Error("User not created");
  }
});

const verification = asyncMiddleware(async (req, res) => {
  const { userID: _id, otp } = req.body;

  const tempuser = await TempUser.findById(_id);

  if (!tempuser) {
    res.status(404);
    throw new Error("User not found");
  }

  if (tempuser && (await tempuser.matchOtp(otp || ""))) {
    const newUser = new User({
      username: tempuser?.username,
      email: tempuser?.email,
      password: tempuser?.password,
      gender: tempuser?.gender,
      profilePic: tempuser?.profilePic,
      phone: tempuser?.phone,
      address: tempuser?.address,
    });

    if (newUser) {
      await newUser.save();
      await tempuser.deleteOne();

      let token = generateTokenAndSetCookie(res, newUser._id, newUser.role);

      res.status(200).json({
        _id: newUser?._id,
        username: newUser?.username,
        email: newUser?.email,
        gender: newUser?.gender,
        profilePic: newUser?.profilePic,
        role: newUser?.role,
        phone: newUser?.phone,
        address: newUser?.address,
      });
    }
  } else {
    res.status(401);
    throw new Error("Invalid OTP or User not found");
  }
});

const login = asyncMiddleware(async (req, res) => {
  const { username, password, email } = req.body;

  let user = null;

  if (username) {
    user = await User.findOne({ username });
  }
  if (email) {
    user = await User.findOne({ email });
  }

  if (user && (await user.matchPassword(password || ""))) {
    let token = generateTokenAndSetCookie(res, user._id, user.role);

    res.status(200).json({
      _id: user?._id,
      username: user?.username,
      email: user?.email,
      gender: user?.gender,
      profilePic: user?.profilePic,
      role: user?.role,
      phone: user?.phone,
      address: user?.address,
      verified: user?.verified,
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

const forgotPassword = asyncMiddleware(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  const userOTPVerification = await UserOTPVerification.findOne({ email });

  if (userOTPVerification) {
    await userOTPVerification.deleteOne();
  }

  if (user) {
    const otp = await sendOTPToRestPassword(req, res, email);

    const newOtp = new UserOTPVerification({
      userId: user?._id,
      email: user?.email,
      otp,
    });

    if (newOtp) {
      await newOtp.save();
      res.status(201).json({
        message: "Otp sent to your email please check your email and verify it",
        userId: user?._id,
      });
    } else {
      res.status(400);
      throw new Error("Otp not created");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const resetPasswordByOtp = asyncMiddleware(async (req, res) => {
  const { userID, otp, newPassword, confirmPassword } = req.body;

  const user = await User.findById(userID);

  if (!user) {
    res.status(404);
    throw new Error("Invalid User");
  }

  const userOTPVerification = await UserOTPVerification.findOne({
    userId: userID,
  });

  if (userOTPVerification && (await userOTPVerification.matchOtp(otp || ""))) {
    if (newPassword) {
      if (newPassword === confirmPassword) {
        user.password = newPassword;
        await user.save();
        await userOTPVerification.deleteOne();
        res.status(200).json({ message: "Password changed successfully" });
      } else {
        res.status(400);
        throw new Error("new password and confirm password do not match");
      }
    } else {
      throw new Error("Invalid Inputs");
    }
  } else {
    res.status(401);
    throw new Error("Invalid OTP ");
  }
});

const getLoggedUser = asyncMiddleware(async (req, res) => {
  const loggedUserID = req.user._id;
  if (loggedUserID) {
    const user = await User.findOne(loggedUserID).select("-password");
    res.status(200).json(user);
  } else {
    res.status(200).json({ message: "User not logged" });
  }
});

const logout = asyncMiddleware(async (req, res) => {
  res.clearCookie("jwt");
  res.clearCookie("role");
  res.status(200).json({ message: "logout successfully" });
});

export {
  signup,
  login,
  logout,
  getLoggedUser,
  verification,
  forgotPassword,
  resetPasswordByOtp,
};
