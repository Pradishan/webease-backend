import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js";
import { createSystemVariable, getAllSystemVariables, getSystemVariable, updateSystemVariable } from "../controllers/systemVariable.controllers.js";


const Router = express.Router();

Router.route("/")
  .get(getAllSystemVariables)
  .post(authMiddleware, adminAuthMiddleware, createSystemVariable);

Router.route("/:id")
  .get(getSystemVariable)
  .put(authMiddleware, adminAuthMiddleware, updateSystemVariable);

export default Router;
