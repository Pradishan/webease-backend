import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js";

const Router = express.Router();

Router.use(authMiddleware);

Router.route("/").get(getUsers);
Router.route("/all").get(adminAuthMiddleware, getAllUsers);
Router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default Router;
