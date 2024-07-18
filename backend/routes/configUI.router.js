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

Router.use(authMiddleware);

Router.route("/")
  .get(getAllConfigUI)
  .post(adminAuthMiddleware, createConfigUI);

Router.route("/:id")
  .get(getConfigUI)
  .put(adminAuthMiddleware, updateConfigUI)
  .delete(adminAuthMiddleware, deleteConfigUI);

export default Router;
