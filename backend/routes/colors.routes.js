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

Router.route("/").get(getAllColors).post(authMiddleware,adminAuthMiddleware, createColor);

Router.route("/:id")
  .get(getColor)
  .put(authMiddleware,adminAuthMiddleware, updateColor)
  .delete(authMiddleware,adminAuthMiddleware, deleteColor);

export default Router;
