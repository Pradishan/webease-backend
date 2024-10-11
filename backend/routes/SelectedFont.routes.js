import express from "express";
import {
  createSelectedFont,
  getSelectedFont,
  deleteSelectedFont,
} from "../controllers/selectedFont.controllers.js"; // Adjust the path to your controller
import authMiddleware from "../middlewares/authMiddleware.js";
import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js";

const router = express.Router();

// Public route to get the selected font
router.route("/").get(getSelectedFont);

// Admin routes to create or delete the selected font
router
  .route("/")
  .post(authMiddleware, adminAuthMiddleware, createSelectedFont)
  .delete(authMiddleware, adminAuthMiddleware, deleteSelectedFont);

export default router;
