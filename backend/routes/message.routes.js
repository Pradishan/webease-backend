import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const Router = express.Router();

Router.use(authMiddleware);

Router.route("/send/:id").post(sendMessage);
Router.route("/:id").get(getMessage);

export default Router;
