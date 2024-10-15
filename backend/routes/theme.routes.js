import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js";
import {
  createTheme,
  getTheme,
  getAllThemes,
  updateTheme,
  deleteTheme,
} from "../controllers/theme.controllers.js";

const Router = express.Router();

Router.route("/")
  .get(getAllThemes)
  .post(authMiddleware,adminAuthMiddleware, createTheme);

Router.route("/:id")
  .get(getTheme)
  .put(authMiddleware,adminAuthMiddleware, updateTheme)
  .delete(authMiddleware,adminAuthMiddleware, deleteTheme);

export default Router;
