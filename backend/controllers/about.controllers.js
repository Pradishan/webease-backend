import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import About from "../models/about.model.js";

const createAbout = asyncMiddleware(async (req, res) => {
  const {image, description } = req.body;

  const newAbout = new About({
    image,
    description,
  });

  if (newAbout) {
    await newAbout.save();

    res.status(201).json(newAbout);
  } else {
    res.status(400);
    throw new Error("About not created");
  }
});

const getAbout = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;
  const about = await About.findById(_id);
  if (!about) {
    res.status(404);
    throw new Error("About not found");
  }
  res.status(200).json(about);
});


const updateAbout = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;

  const about = await About.findById(_id);

  if (about) {
    about.image = req.body.image || about.image;  
    about.description = req.body.description || about.description;

    const updatedAbout = await about.save();

    res.json(updatedAbout);
  } else {
    res.status(404);
    throw new Error("About not found");
  }
});


export {
  createAbout,
  getAbout,
  updateAbout,
};
