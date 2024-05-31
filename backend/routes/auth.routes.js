import express from "express";
import { getLoggedUser, login, logout, signup } from "../controllers/auth.controllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const Router = express.Router();

Router.route("/signup").post(signup);
Router.route("/login").post(login);
Router.route("/logout").post(logout);
Router.route("/loggedUser").get(authMiddleware,getLoggedUser);

export default Router;
