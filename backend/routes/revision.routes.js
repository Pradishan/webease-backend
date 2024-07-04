import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createRevision,
  deleteRevision,
  getAllRevisions,
  getAllRevisionsByClientId,
  getAllRevisionsByOrderId,
  getRevision,
  updateRevision,
} from "../controllers/revision.controllers.js";

const Router = express.Router();

Router.use(authMiddleware);

Router.route("/").get(getAllRevisions);
Router.route("/client/:clientID").get(getAllRevisionsByClientId);

Router.route("/order/:orderID/")
  .get(getAllRevisionsByOrderId)
  .post(createRevision);

Router.route("/:revisionID")
  .get(getRevision)
  .put(updateRevision)
  .delete(deleteRevision);

export default Router;
