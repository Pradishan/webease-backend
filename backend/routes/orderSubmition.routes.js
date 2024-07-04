import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createOrderSubmition,
  deleteOrderSubmition,
  getAllOrderSubmitions,
  getAllOrderSubmitionsByClientId,
  getAllOrderSubmitionsByOrderId,
  getOrderSubmition,
  updateOrderSubmition,
} from "../controllers/orderSubmitios.controllers.js";

const Router = express.Router();

Router.use(authMiddleware);

Router.route("/").get(getAllOrderSubmitions);
Router.route("/client/:clientID").get(getAllOrderSubmitionsByClientId);

Router.route("/order/:orderID")
  .get(getAllOrderSubmitionsByOrderId)
  .post(createOrderSubmition);

Router.route("/:orderSubmitionID")
  .get(getOrderSubmition)
  .put(updateOrderSubmition)
  .delete(deleteOrderSubmition);

export default Router;