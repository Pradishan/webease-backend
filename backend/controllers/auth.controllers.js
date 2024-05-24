import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const signup = asyncMiddleware(async (req, res) => {
  const { username, email, password, gender, confirmPassword, role } = req.body;

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("The passwords are not matching");
  }

  const user = await User.findOne({ username });

  if (user) {
    res.status(400);
    throw new Error("The username is alrady exists");
  }

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400);
    throw new Error("The Email is already exists");
  }

  const bodyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

  const newUser = new User({
    username,
    email,
    password,
    gender,
    profilePic: gender === "male" ? bodyProfilePic : girlProfilePic,
  });

  if (role) {
    newUser.role = role;
  }

  if (newUser) {
    await newUser.save();
    generateTokenAndSetCookie(res, newUser._id);
    res.status(201).json({
      _id: newUser?._id,
      username: newUser?.username,
      email: newUser?.email,
      gender: newUser?.gender,
      profilePic: newUser?.profilePic,
    });
  } else {
    res.status(400);
    throw new Error("User not created");
  }
});

const login = asyncMiddleware(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password || ""))) {
    generateTokenAndSetCookie(res, user._id);

    res.status(200).json({
      _id: user?._id,
      username: user?.username,
      email: user?.email,
      gender: user?.gender,
      profilePic: user?.profilePic,
    });
  } else {
    res.status(404);
    throw new Error("Invalid credentials");
  }
});

const logout = asyncMiddleware(async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "logout successfully" });
});

export { signup, login, logout };
