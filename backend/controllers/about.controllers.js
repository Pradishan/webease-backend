import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import About from "../models/about.model.js";

// Helper function to validate request body
const validateAboutData = (data) => {
  const errors = [];

  if (!data.name) {
    errors.push({ message: "Name is required" });
  }
  if (!data.logo) {
    errors.push({ message: "Logo is required" });
  }
  if (!data.banner || !data.banner.text) {
    errors.push({ message: "Banner text is required" });
  }
  if (!data.banner || !data.banner.subText) {
    errors.push({ message: "Banner subText is required" });
  }
  if (!data.about || !data.about.image) {
    errors.push({ message: "About image is required" });
  }
  if (!data.about || !data.about.description) {
    errors.push({ message: "About description is required" });
  }
  if (!data.stat || !Array.isArray(data.stat)) {
    errors.push({ message: "Stat must be an array" });
  } else {
    data.stat.forEach((Item, index) => {
      if (!Item.title) {
        errors.push({ message: `Stat title is required at index ${index}` });
      }
      if (!Item.value) {
        errors.push({ message: `Stat value is required at index ${index}` });
      }
      if (typeof Item.value !== "number") {
        errors.push({ message: `Stat value should be a number at index ${index}` });
      }
    });
  }
  if (!data.fetures || !Array.isArray(data.fetures)) {
    errors.push({ message: "Fetures must be an array" });
  } else {
    data.fetures.forEach((Item, index) => {
      if (!Item.title) {
        errors.push({ message: `Fetures title is required at index ${index}` });
      }
      if (!Item.text) {
        errors.push({ message: `Fetures text is required at index ${index}` });
      }
    });
  }
  return errors;
};

const createAbout = asyncMiddleware(async (req, res) => {
  const errors = validateAboutData(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const { name, logo, banner, about, stat, fetures } = req.body;

  const newAbout = new About({
    name,
    logo,
    banner,
    about,
    stat,
    fetures,
  });

  if (newAbout) {
    await newAbout.save();
    res.status(201).json(newAbout);
  } else {
    res.status(400).json({ message: "About not created" });
  }
});

const getAllAbout = asyncMiddleware(async (req, res) => {
  const about = await About.find({});
  if (!about || about.length === 0) {
    res.status(404).json({ message: "No About documents found" });
  } else {
    res.status(200).json(about);
  }
});

const getAbout = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;
  const about = await About.findById(_id);
  if (!about) {
    res.status(404).json({ message: "About not found" });
  } else {
    res.status(200).json(about);
  }
});

const updateAbout = asyncMiddleware(async (req, res) => {
  const errors = validateAboutData(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  let _id = req.params.id;
  const { name, logo, banner, about, stat, fetures } = req.body;

  const existingAbout = await About.findById(_id);

  if (existingAbout) {
    existingAbout.name = name || existingAbout.name;
    existingAbout.logo = logo || existingAbout.logo;
    existingAbout.banner = banner || existingAbout.banner;
    existingAbout.about = about || existingAbout.about;
    existingAbout.stat = stat || existingAbout.stat;
    existingAbout.fetures = fetures || existingAbout.fetures;

    const updatedAbout = await existingAbout.save();
    res.json(updatedAbout);
  } else {
    res.status(404).json({ message: "About not found" });
  }
});

export { createAbout, getAbout, getAllAbout, updateAbout };
