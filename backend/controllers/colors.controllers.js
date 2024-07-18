import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import Colors from "../models/colors.model.js";

const createColor = asyncMiddleware(async (req, res) => {
  const { primary, secondary, accent, neutral, success } = req.body;

  const newColors = new Colors({
    primary,
    secondary,
    accent,
    neutral,
    success,
  });

  await newColors.save();

  res.status(201).json(newColors);
});

const getColor = asyncMiddleware(async (req, res) => {
  const _id = req.params.id;
  const color = await Colors.findById(_id);
  if (!color) {
    res.status(404);
    throw new Error("Color not found");
  }
  res.status(200).json(color);
});

const getAllColors = asyncMiddleware(async (req, res) => {
  const colors = await Colors.find({});
  if (colors.length === 0) {
    res.status(404);
    throw new Error("No colors found");
  }
  res.status(200).json(colors);
});

const updateColor = asyncMiddleware(async (req, res) => {
  const _id = req.params.id;
  const { primary, secondary, accent, neutral, success } = req.body;

  const color = await Colors.findById(_id);

  if (color) {
    color.primary = primary || color.primary;
    color.secondary = secondary || color.secondary;
    color.accent = accent || color.accent;
    color.neutral = neutral || color.neutral;
    color.success = success || color.success;

    const updatedColor = await color.save();
    res.json(updatedColor);
  } else {
    res.status(404);
    throw new Error("Color not found");
  }
});

const deleteColor = asyncMiddleware(async (req, res) => {
  const _id = req.params.id;

  const color = await Colors.findById(_id);

  if (color) {
    await color.deleteOne();
    res.json({ message: "Color removed" });
  } else {
    res.status(404);
    throw new Error("Color not found");
  }
});

export {
  createColor,
  getColor,
  getAllColors,
  updateColor,
  deleteColor,
};
