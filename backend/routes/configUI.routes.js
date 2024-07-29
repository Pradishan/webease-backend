import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js";
import {
  createConfigUI,
  getConfigUI,
  getAllConfigUI,
  updateConfigUI,
  deleteConfigUI,
} from "../controllers/configUI.controller.js";

const Router = express.Router();

Router.route("/")
  .get(getAllConfigUI)
  .post(authMiddleware,adminAuthMiddleware, createConfigUI);

Router.route("/:id")
  .get(getConfigUI)
  .put(authMiddleware,adminAuthMiddleware, updateConfigUI)
  .delete(authMiddleware,adminAuthMiddleware, deleteConfigUI);

export default Router;
