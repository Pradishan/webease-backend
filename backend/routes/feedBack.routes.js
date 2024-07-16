import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createFeedBack,
  deleteFeedBack,
  displayFeedBack,
  getAllFeedBack,
  getAllFeedBackByClientId,
  getFeedBack,
  updateFeedBack,
} from "../controllers/feedBack.controllers.js";

const Router = express.Router();

Router.route("/").get(getAllFeedBack).post(authMiddleware, createFeedBack);
Router.route("/display").get(displayFeedBack);

Router.route("/:id")
  .get(getFeedBack)
  .put(authMiddleware, updateFeedBack)
  .delete(authMiddleware, deleteFeedBack);

Router.route("/client/:clientID").get(authMiddleware, getAllFeedBackByClientId);

export default Router;
