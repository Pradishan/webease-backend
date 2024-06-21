import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import Category from "../models/category.model.js";
import SubCategory from "../models/subcategory.model.js";

const createCategory = asyncMiddleware(async (req, res) => {
  const { name, description } = req.body;
  const category = await Category.findOne({ name });

  if (category) {
    res.status(400);
    throw new Error("Category is alrady exists");
  }

  const newCategory = new Category({
    name,
    description,
  });

  if (newCategory) {
    await newCategory.save();

    res.status(201).json(newCategory);
  } else {
    res.status(400);
    throw new Error("Category not created");
  }
});

const getCategory = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;
  const category = await Category.findById(_id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  res.status(200).json(category);
});

const getAllCategory = asyncMiddleware(async (req, res) => {
  const categoryies = await Category.find({});

  if (categoryies.length === 0) {
    res.status(404);
    throw new Error("No categoryies found");
  }
  if (!categoryies) {
    throw new Error("Error fetching categoryies");
  }
  res.status(200).json(categoryies);
});

const updateCategory = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;

  const category = await Category.findById(_id);

  if (category) {
    category.name = req.body.name || category.name;
    category.description = req.body.description || category.description;

    const updatedCategory = await category.save();

    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

const deleteCategory = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;

  const category = await Category.findById(_id);

  if (category) {
    await category.deleteOne();
    res.json({ message: "Category removed" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

const createSubCategory = asyncMiddleware(async (req, res) => {
  let categoryID = req.params.categoryID;
  const { name, description } = req.body;

  const category = await Category.findById(categoryID);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  const subCategory = await SubCategory.findOne({ name, categoryID });

  if (subCategory) {
    res.status(400);
    throw new Error("Sub Category is alrady exists");
  }

  const newSubCategory = new SubCategory({
    categoryID,
    name,
    description,
  });

  if (newSubCategory) {
    await newSubCategory.save();

    res.status(201).json(newSubCategory);
  } else {
    res.status(400);
    throw new Error("Sub Category not created");
  }
});

const getSubCategory = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;
  const subCategory = await SubCategory.findById(_id);
  if (!subCategory) {
    res.status(404);
    throw new Error("Sub Category not found");
  }
  res.status(200).json(subCategory);
});

const getAllSubCategory = asyncMiddleware(async (req, res) => {
  const subCategoryies = await SubCategory.find({});

  if (subCategoryies.length === 0) {
    res.status(404);
    throw new Error("No sub categoryies found");
  }
  if (!subCategoryies) {
    throw new Error("Error fetching sub categoryies");
  }
  res.status(200).json(subCategoryies);
});

const getAllSubCategoryByCategory = asyncMiddleware(async (req, res) => {
  let categoryID = req.params.categoryID;
  const subCategoryies = await SubCategory.find({ categoryID });

  if (subCategoryies.length === 0) {
    res.status(404);
    throw new Error("No sub categoryies found");
  }
  if (!subCategoryies) {
    throw new Error("Error fetching sub categoryies");
  }
  res.status(200).json(subCategoryies);
});

const updateSubCategory = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;

  const subCategory = await SubCategory.findById(_id);

  if (subCategory) {
    subCategory.name = req.body.name || subCategory.name;
    subCategory.description = req.body.description || subCategory.description;

    const updatedSubCategory = await subCategory.save();

    res.json(updatedSubCategory);
  } else {
    res.status(404);
    throw new Error("Sub Category not found");
  }
});

const deleteSubCategory = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;

  const subCategory = await SubCategory.findById(_id);

  if (subCategory) {
    await subCategory.deleteOne();
    res.json({ message: "Sub Category removed" });
  } else {
    res.status(404);
    throw new Error("Sub Category not found");
  }
});

export {
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  createSubCategory,
  getSubCategory,
  getAllSubCategory,
  getAllSubCategoryByCategory,
  updateSubCategory,
  deleteSubCategory,
};
