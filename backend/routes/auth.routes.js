import express from "express";
import { login, logout, signup } from "../controllers/auth.controllers.js";

const Router = express.Router();

Router.route("/signup").post(signup);
Router.route("/login").post(login);
Router.route("/logout").post(logout);

export default Router;
