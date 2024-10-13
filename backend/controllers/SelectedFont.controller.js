import asyncHandler from "express-async-handler";
import SelectedFont from "../models/selectedFont.model.js"; // Adjust the path to your model

// @desc Create or Set the selected font
// @route POST /api/selected-font
// @access Private/Admin
const createSelectedFont = asyncHandler(async (req, res) => {
  const { selectedFont } = req.body;

  // Check if the font already exists
  const existingFont = await SelectedFont.findOne({});
  
  if (existingFont) {
    // Update existing font
    existingFont.selectedFont = selectedFont;
    const updatedFont = await existingFont.save();
    res.status(200).json(updatedFont);
  } else {
    // Create new selected font
    const newFont = new SelectedFont({ selectedFont });
    const createdFont = await newFont.save();
    res.status(201).json(createdFont);
  }
});

// @desc Get the currently selected font
// @route GET /api/selected-font
// @access Public
const getSelectedFont = asyncHandler(async (req, res) => {
  const font = await SelectedFont.findOne({});
  if (font) {
    res.status(200).json(font);
  } else {
    res.status(404);
    throw new Error("Selected font not found");
  }
});

// @desc Delete the selected font
// @route DELETE /api/selected-font
// @access Private/Admin
const deleteSelectedFont = asyncHandler(async (req, res) => {
  const font = await SelectedFont.findOne({});
  if (font) {
    await font.deleteOne();
    res.json({ message: "Selected font removed" });
  } else {
    res.status(404);
    throw new Error("Selected font not found");
  }
});

export {
  createSelectedFont,
  getSelectedFont,
  deleteSelectedFont,
};
