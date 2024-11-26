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

Router.route("/").get(getAllPackges).post(authMiddleware,adminAuthMiddleware, createPackges);

Router.route("/:id")
  .get(getPackges)
  .put(authMiddleware,adminAuthMiddleware, updatePackges)
  .delete(authMiddleware,adminAuthMiddleware, deletePackges);

export default Router;