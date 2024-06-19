import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { payHereHash } from "../controllers/payment.controllers.js";

const Router = express.Router();

Router.use(authMiddleware);

Router.route('/payment-hash').post(payHereHash);

export default Router;
