import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import ConfigUI from "../models/configUI.model.js";

const createConfigUI = asyncMiddleware(async (req, res) => {
  const { name, themeID, description } = req.body;

  const newConfigUI = new ConfigUI({
    name,
    themeID,
    description,
  });

  await newConfigUI.save();

  res.status(201).json(newConfigUI);
});

const getConfigUI = asyncMiddleware(async (req, res) => {
  const _id = req.params.id;

  const configUI = await ConfigUI.findById(_id).populate('themeID');

  if (!configUI) {
    res.status(404);
    throw new Error("ConfigUI not found");
  }

  res.status(200).json(configUI);
});

const getAllConfigUI = asyncMiddleware(async (req, res) => {
  const configUIs = await ConfigUI.find({});

  if (configUIs.length === 0) {
    res.status(404);
    throw new Error("No ConfigUIs found");
  }

  res.status(200).json(configUIs);
});

const updateConfigUI = asyncMiddleware(async (req, res) => {
  const _id = req.params.id;
  const { name, themeID, description } = req.body;

  const configUI = await ConfigUI.findById(_id);

  if (configUI) {
    configUI.name = name || configUI.name;
    configUI.themeID = themeID || configUI.themeID;
    configUI.description = description || configUI.description;

    const updatedConfigUI = await configUI.save();
    res.json(updatedConfigUI);
  } else {
    res.status(404);
    throw new Error("ConfigUI not found");
  }
});

const deleteConfigUI = asyncMiddleware(async (req, res) => {
  const _id = req.params.id;

  const configUI = await ConfigUI.findById(_id);

  if (configUI) {
    await configUI.deleteOne();
    res.json({ message: "ConfigUI removed" });
  } else {
    res.status(404);
    throw new Error("ConfigUI not found");
  }
});

export {
  createConfigUI,
  getConfigUI,
  getAllConfigUI,
  updateConfigUI,
  deleteConfigUI,
};
