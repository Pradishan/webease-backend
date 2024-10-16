import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js";
import {
  createComponents,
  getAllComponents,
  getComponents,
  updateComponents,
} from "../controllers/componants.controllers.js";

const Router = express.Router();

Router.route("/")
  .get(getAllComponents)
  .post(authMiddleware, adminAuthMiddleware, createComponents);

Router.route("/:id")
  .get(getComponents)
  .put(authMiddleware, adminAuthMiddleware, updateComponents);

export default Router;
