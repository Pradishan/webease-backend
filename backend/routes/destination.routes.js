import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js";
import {
  createDestination,
  getAllDestinations,
  getDestination,
  updateDestination,
} from "../controllers/destination.controllers.js";

const Router = express.Router();

Router.route("/")
  .get(getAllDestinations)
  .post(authMiddleware, adminAuthMiddleware, createDestination);

Router.route("/:id")
  .get(getDestination)
  .put(authMiddleware, adminAuthMiddleware, updateDestination);

export default Router;
