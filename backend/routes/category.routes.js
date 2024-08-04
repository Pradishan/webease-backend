import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js";
import {
  createCategory,
  createSubCategory,
  deleteCategory,
  deleteSubCategory,
  getAllCategory,
  getAllSubCategory,
  getAllSubCategoryByCategory,
  getCategory,
  getSubCategory,
  updateCategory,
  updateSubCategory,
} from "../controllers/category.controllers.js";

const Router = express.Router();

Router.route("/")
  .get(getAllCategory)
  .post(authMiddleware, adminAuthMiddleware, createCategory);

Router.route("/sub/:id")
  .get(authMiddleware, getSubCategory)
  .put(authMiddleware, adminAuthMiddleware, updateSubCategory)
  .delete(authMiddleware, adminAuthMiddleware, deleteSubCategory);

Router.route("/sub").get(authMiddleware, getAllSubCategory);

Router.route("/:id")
  .get(authMiddleware, getCategory)
  .put(authMiddleware, adminAuthMiddleware, updateCategory)
  .delete(authMiddleware, adminAuthMiddleware, deleteCategory);

Router.route("/:categoryID/sub")
  .get(getAllSubCategoryByCategory)
  .post(authMiddleware, adminAuthMiddleware, createSubCategory);

export default Router;
