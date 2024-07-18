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

Router.use(authMiddleware);

Router.route("/")
  .get(getAllThemes)
  .post(adminAuthMiddleware, createTheme);

Router.route("/:id")
  .get(getTheme)
  .put(adminAuthMiddleware, updateTheme)
  .delete(adminAuthMiddleware, deleteTheme);

export default Router;
