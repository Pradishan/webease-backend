import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js";
import {
  createPortfolio,
  getAllPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
} from "../controllers/portfolio.controller.js";

const Router = express.Router();

// Routes for portfolios

// Get all portfolios or create a new portfolio (admin only)
Router.route("/")
  .get(authMiddleware, getAllPortfolios) // Authenticated users can view all portfolios
  .post(authMiddleware, adminAuthMiddleware, createPortfolio); // Only admins can create portfolios

// Get, update, or delete a specific portfolio by ID (admin only for update/delete)
Router.route("/:id")
  .get(authMiddleware, getPortfolioById) // Authenticated users can view a portfolio by ID
  .put(authMiddleware, adminAuthMiddleware, updatePortfolio) // Only admins can update portfolios
  .delete(authMiddleware, adminAuthMiddleware, deletePortfolio); // Only admins can delete portfolios

export default Router;
