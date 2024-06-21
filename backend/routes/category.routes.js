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

Router.use(authMiddleware);

Router.route("/").get(getAllCategory).post(adminAuthMiddleware, createCategory);

Router.route("/sub/:id")
  .get(getSubCategory)
  .put(adminAuthMiddleware, updateSubCategory)
  .delete(adminAuthMiddleware, deleteSubCategory);

Router.route("/sub").get(getAllSubCategory);

Router.route("/:id")
  .get(getCategory)
  .put(adminAuthMiddleware, updateCategory)
  .delete(adminAuthMiddleware, deleteCategory);

  Router.route("/:categoryID/sub")
  .get(getAllSubCategoryByCategory)
  .post(adminAuthMiddleware, createSubCategory);

export default Router;
