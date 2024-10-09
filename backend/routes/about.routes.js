import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js";
import {
  createAbout,
  getAbout,
  updateAbout,
} from "../controllers/about.controllers.js";

const Router = express.Router();

Router.use(authMiddleware);

Router.route("/").get(getAbout).post(adminAuthMiddleware, createAbout);

Router.route("/:id")
  .get(getAbout)
  .put(adminAuthMiddleware, updateAbout)
 export default Router;