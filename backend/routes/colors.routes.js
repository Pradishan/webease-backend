import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js";
import {
  createColor,
  getColor,
  getAllColors,
  updateColor,
  deleteColor,
} from "../controllers/colors.controllers.js";

const Router = express.Router();

Router.use(authMiddleware);

Router.route("/").get(getAllColors).post(adminAuthMiddleware, createColor);

Router.route("/:id")
  .get(getColor)
  .put(adminAuthMiddleware, updateColor)
  .delete(adminAuthMiddleware, deleteColor);

export default Router;
