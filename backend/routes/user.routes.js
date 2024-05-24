import express from "express";
import { getUsers, getUsersadmin } from "../controllers/user.controllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js";

const Router = express.Router();

Router.route("/").get(authMiddleware, getUsers);
Router.route("/admin").get(authMiddleware,adminAuthMiddleware,getUsersadmin);

export default Router;
