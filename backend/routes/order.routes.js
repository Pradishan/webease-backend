import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createOrder,
  deleteOrder,
  deleteOrderRequest,
  getAllOrders,
  getAllOrdersByClientID,
  getAllOrdreRequests,
  getOrder,
  getOrdreRequest,
  getOrdreRequestByClient,
  updateOrder,
  updateOrderRequest,
} from "../controllers/order.controllers.js";

import orderSubmitionRouter from "./orderSubmition.routes.js";
import revisionRouter from "./revision.routes.js";

const Router = express.Router();

Router.use(authMiddleware);

Router.route("/").get(getAllOrders).post(createOrder);

Router.route("/orderRequest").get(getAllOrdreRequests);
Router.route("/orderRequest/client").get(getOrdreRequestByClient);
Router.route("/orderRequest/:orderRequestID")
  .get(getOrdreRequest)
  .put(updateOrderRequest)
  .delete(deleteOrderRequest);

Router.use("/revision", revisionRouter);
Router.use("/orderSubmition", orderSubmitionRouter);

Router.route("/client/:clientID").get(getAllOrdersByClientID);

Router.route("/:orderID").get(getOrder).put(updateOrder).delete(deleteOrder);

export default Router;
