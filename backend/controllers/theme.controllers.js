import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import Theme from "../models/theme.model.js";
import Colors from "../models/colors.model.js";

const createTheme = asyncMiddleware(async (req, res) => {
  const { name, colorID, description } = req.body;

  const color = await Colors.findById(colorID);
  if (!color) {
    res.status(404);
    throw new Error("Color not found");
  }

  const newTheme = new Theme({
    name,
    colorID,
    description,
  });

  await newTheme.save();

  res.status(201).json(newTheme);
});

const getTheme = asyncMiddleware(async (req, res) => {
  const _id = req.params.id;
  const theme = await Theme.findById(_id)
    .populate({
      path: 'colorID',
      select: '-_id -createdAt -updatedAt -__v'
    });

  if (!theme) {
    res.status(404);
    throw new Error("Theme not found");
  }

  res.status(200).json(theme);
});


const getAllThemes = asyncMiddleware(async (req, res) => {
  const themes = await Theme.find({}).populate('colorID');
  if (themes.length === 0) {
    res.status(404);
    throw new Error("No themes found");
  }
  res.status(200).json(themes);
});

const updateTheme = asyncMiddleware(async (req, res) => {
  const _id = req.params.id;
  const { name, colorID, description } = req.body;

  const theme = await Theme.findById(_id);

  if (theme) {
    theme.name = name || theme.name;
    theme.colorID = colorID || theme.colorID;
    theme.description = description || theme.description;

    const updatedTheme = await theme.save();
    res.json(updatedTheme);
  } else {
    res.status(404);
    throw new Error("Theme not found");
  }
});

const deleteTheme = asyncMiddleware(async (req, res) => {
  const _id = req.params.id;

  const theme = await Theme.findById(_id);

  if (theme) {
    await theme.deleteOne();
    res.json({ message: "Theme removed" });
  } else {
    res.status(404);
    throw new Error("Theme not found");
  }
});

export {
  createTheme,
  getTheme,
  getAllThemes,
  updateTheme,
  deleteTheme,
};
