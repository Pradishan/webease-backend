import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import Packges from "../models/packges.model.js";

const createPackges = asyncMiddleware(async (req, res) => {
  const { service, image, title, price, description } = req.body;
  const packges = await Packges.findOne({ title });

  if (packges) {
    res.status(400);
    throw new Error("Packges is alrady exists");
  }

  const newPackges = new Packges({
    service,
    title,
    image,
    price,
    description,
  });

  if (newPackges) {
    await newPackges.save();

    res.status(201).json(newPackges);
  } else {
    res.status(400);
    throw new Error("Packges not created");
  }
});

const getPackges = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;
  const packges = await Packges.findById(_id);
  if (!packges) {
    res.status(404);
    throw new Error("Packges not found");
  }
  res.status(200).json(packges);
});

const getAllPackges = asyncMiddleware(async (req, res) => {
  const packges = await Packges.find({});

  if (packges.length === 0) {
    res.status(404);
    throw new Error("No packges found");
  }
  if (!packges) {
    throw new Error("Error fetching packges");
  }
  res.status(200).json(packges);
});

const updatePackges = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;

  const packges = await Packges.findById(_id);

  if (packges) {
    packges.service = req.body.service || packges.service;
    packges.title = req.body.title || packges.title;
    packges.image = req.body.image || packges.image;
    packges.price = req.body.price || packges.price;
    packges.description = req.body.description || packges.description;

    const updatedPackges = await packges.save();

    res.json(updatedPackges);
  } else {
    res.status(404);
    throw new Error("Packges not found");
  }
});

const deletePackges = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;

  const packges= await Packges.findById(_id);

  if (packges) {
    await packges.deleteOne();
    res.json({ message: "Packges removed" });
  } else {
    res.status(404);
    throw new Error("Packges not found");
  }
});

export {
  createPackges,
  getPackges,
  getAllPackges,
  updatePackges,
  deletePackges,
};
