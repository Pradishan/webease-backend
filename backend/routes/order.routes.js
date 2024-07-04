import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createOrder,
  createRevision,
  deleteOrder,
  deleteOrderRequest,
  deleteRevision,
  getAllOrders,
  getAllOrdersByClientID,
  getAllOrdreRequests,
  getAllRevisions,
  getAllRevisionsByClientId,
  getAllRevisionsByOrderId,
  getOrder,
  getOrdreRequest,
  getOrdreRequestByClient,
  getRevision,
  updateOrder,
  updateOrderRequest,
  updateRevision,
} from "../controllers/order.controllers.js";

const Router = express.Router();

Router.use(authMiddleware);

Router.route("/").get(getAllOrders).post(createOrder);

Router.route("/orderRequest").get(getAllOrdreRequests);
Router.route("/orderRequest/client").get(getOrdreRequestByClient);
Router.route("/orderRequest/:orderRequestID")
  .get(getOrdreRequest)
  .put(updateOrderRequest)
  .delete(deleteOrderRequest);

Router.route("/client/:clientID").get(getAllOrdersByClientID);
Router.route("/revision").get(getAllRevisions);
Router.route("/revision/:clientID").get(getAllRevisionsByClientId);

Router.route("/:orderID/revision/:revisionID")
  .get(getRevision)
  .put(updateRevision)
  .delete(deleteRevision);

Router.route("/:orderID/revision")
  .get(getAllRevisionsByOrderId)
  .post(createRevision);

Router.route("/:orderID").get(getOrder).put(updateOrder).delete(deleteOrder);

export default Router;
