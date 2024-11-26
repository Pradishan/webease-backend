import express from "express";
import {
  createPortfolio,
  getAllPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
} from "../controllers/portfolio.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js";

const Router = express.Router();

// Route for all portfolios or creating a new portfolio (admin required for creation)
Router.route("/")
  .get(getAllPortfolios)
  .post(authMiddleware, adminAuthMiddleware, createPortfolio);

// Route for a specific portfolio by ID
Router.route("/:id")
  .get(authMiddleware, getPortfolioById)
  .put(authMiddleware, adminAuthMiddleware, updatePortfolio)
  .delete(authMiddleware, adminAuthMiddleware, deletePortfolio);

export default Router;
