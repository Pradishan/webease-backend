import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js";
import {
  createPackges,
  deletePackges,
  getAllPackges,
  getPackges,
  updatePackges,
} from "../controllers/packges.controller.js";

const Router = express.Router();

Router.use(authMiddleware);

Router.route("/").get(getAllPackges).post(adminAuthMiddleware, createPackges);

Router.route("/:id")
  .get(getPackges)
  .put(adminAuthMiddleware, updatePackges)
  .delete(adminAuthMiddleware, deletePackges);

export default Router;