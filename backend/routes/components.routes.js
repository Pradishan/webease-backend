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

Router.use(authMiddleware);

Router.route("/")
  .get(getAllComponents)
  .post(adminAuthMiddleware, createComponents);

Router.route("/:id")
  .get(getComponents)
  .put(adminAuthMiddleware, updateComponents);

export default Router;
