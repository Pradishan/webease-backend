import express from "express";
import {
  getMessage,
  getMessageFromAdmin,
  sendMessage,
  sendMessageToAdmin,
} from "../controllers/message.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const Router = express.Router();

Router.use(authMiddleware);

Router.route("/send/admin").post(sendMessageToAdmin);
Router.route("/admin").get(getMessageFromAdmin);
Router.route("/send/:id").post(sendMessage);
Router.route("/:id").get(getMessage);


export default Router;
