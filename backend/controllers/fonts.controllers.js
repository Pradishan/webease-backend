import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import Fonts from "../models/fonts.model.js";

const createFont = asyncMiddleware(async (req, res) => {
  const { font1, font2, font3, font4, font5 } = req.body;

  const newFonts = new Fonts({
    font1,
    font2,
    font3,
    font4,
    font5,
  });

  await newFonts.save();

  res.status(201).json(newFonts);
});

const getFont = asyncMiddleware(async (req, res) => {
  const _id = req.params.id;
  const font = await Fonts.findById(_id);
  if (!font) {
    res.status(404);
    throw new Error("Font not found");
  }
  res.status(200).json(font);
});

const getAllFonts = asyncMiddleware(async (req, res) => {
  const fonts = await Fonts.find({});
  if (fonts.length === 0) {
    res.status(404);
    throw new Error("No fonts found");
  }
  res.status(200).json(fonts);
});

const updateFont = asyncMiddleware(async (req, res) => {
  const _id = req.params.id;
  const { font1, font2, font3, font4, font5 } = req.body;

  const font = await Fonts.findById(_id);

  if (font) {
    font.font1 = font1 || font.font1;
    font.font2 = font2 || font.font2;
    font.font3 = font3 || font.font3;
    font.font4 = font4 || font.font4;
    font.font5 = font5 || font.font5;

    const updatedFont = await font.save();
    res.json(updatedFont);
  } else {
    res.status(404);
    throw new Error("Font not found");
  }
});

const deleteFont = asyncMiddleware(async (req, res) => {
  const _id = req.params.id;

  const font = await Fonts.findById(_id);

  if (font) {
    await font.deleteOne();
    res.json({ message: "Font removed" });
  } else {
    res.status(404);
    throw new Error("Font not found");
  }
});

export {
  createFont,
  getFont,
  getAllFonts,
  updateFont,
  deleteFont,
};
