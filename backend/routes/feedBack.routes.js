import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createFeedBack,
  deleteFeedBack,
  getAllFeedBack,
  getAllFeedBackByClientId,
  getFeedBack,
  updateFeedBack,
} from "../controllers/feedBack.controllers.js";

const Router = express.Router();

Router.use(authMiddleware);

Router.route("/").get(getAllFeedBack).post(createFeedBack);

Router.route("/:id")
  .get(getFeedBack)
  .put(updateFeedBack)
  .delete(deleteFeedBack);

Router.route("/client/:clientID").get(getAllFeedBackByClientId);

export default Router;
