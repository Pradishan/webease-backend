import express from "express";
import {
  forgotPassword,
  getLoggedUser,
  login,
  logout,
  resetPasswordByOtp,
  signup,
  verification,
} from "../controllers/auth.controllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const Router = express.Router();

Router.route("/signup").post(signup);
Router.route("/verify").post(verification);
Router.route("/forgetPassword").post(forgotPassword);
Router.route("/resetPasswordByOtp").post(resetPasswordByOtp);
Router.route("/login").post(login);
Router.route("/logout").post(logout);
Router.route("/loggedUser").get(authMiddleware,getLoggedUser);

export default Router;
