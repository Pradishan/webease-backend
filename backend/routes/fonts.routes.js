import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js";
import {
  createFont,
  getFont,
  getAllFonts,
  updateFont,
  deleteFont,
} from "../controllers/fonts.controllers.js";

const Router = express.Router();

Router.use(authMiddleware);

// Updated route names and controller methods to reflect fonts instead of colors
Router.route("/").get(getAllFonts).post(adminAuthMiddleware, createFont);

Router.route("/:id")
  .get(getFont)
  .put(adminAuthMiddleware, updateFont)
  .delete(adminAuthMiddleware, deleteFont);

export default Router;
