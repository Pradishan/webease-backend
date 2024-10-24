import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import Destination from "../models/destination.model.js";

// Helper function to validate request body
const validateDestinationData = (data) => {
  const errors = [];

  if (!data.intro) {
    errors.push({ message: "Intro is required" });
  }
  if (!data.image) {
    errors.push({ message: "Image is required" });
  }
  if (!data.name) {
    errors.push({ message: "Name is required" });
  }
  if (!data.culinaryDelights) {
    errors.push({ message: "Culinary Delights is required" });
  }
  if (!data.description) {
    errors.push({ message: "Description is required" });
  }

  // Validate must points
  if (!data.must || !Array.isArray(data.must)) {
    errors.push({ message: "Must points must be an array" });
  } else {
    data.must.forEach((item, index) => {
      if (!item.point) {
        errors.push({ message: `Must point is required at index ${index}` });
      }
    });
  }

  // Validate tips
  if (!data.tips || !Array.isArray(data.tips)) {
    errors.push({ message: "Tips must be an array" });
  } else {
    data.tips.forEach((item, index) => {
      if (!item.tip) {
        errors.push({ message: `Tip is required at index ${index}` });
      }
    });
  }

  return errors;
};

// Create a new destination
const createDestination = asyncMiddleware(async (req, res) => {
  const errors = validateDestinationData(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const { intro, image, name, culinaryDelights, description, must, tips } = req.body;

  const newDestination = new Destination({
    intro,
    image,
    name,
    culinaryDelights,
    description,
    must,
    tips,
  });

  if (newDestination) {
    await newDestination.save();
    res.status(201).json(newDestination);
  } else {
    res.status(400).json({ message: "Destination not created" });
  }
});

// Get all destinations
const getAllDestinations = asyncMiddleware(async (req, res) => {
  const destinations = await Destination.find({});
  if (!destinations || destinations.length === 0) {
    res.status(404).json({ message: "No destinations found" });
  } else {
    res.status(200).json(destinations);
  }
});

// Get a single destination by ID
const getDestination = asyncMiddleware(async (req, res) => {
  const _id = req.params.id;
  const destination = await Destination.findById(_id);
  if (!destination) {
    res.status(404).json({ message: "Destination not found" });
  } else {
    res.status(200).json(destination);
  }
});

// Update an existing destination by ID
const updateDestination = asyncMiddleware(async (req, res) => {
  const errors = validateDestinationData(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const { intro, image, name, culinaryDelights, description, must, tips } = req.body;
  const _id = req.params.id;

  const existingDestination = await Destination.findById(_id);

  if (existingDestination) {
    existingDestination.intro = intro || existingDestination.intro;
    existingDestination.image = image || existingDestination.image;
    existingDestination.name = name || existingDestination.name;
    existingDestination.culinaryDelights = culinaryDelights || existingDestination.culinaryDelights;
    existingDestination.description = description || existingDestination.description;
    existingDestination.must = must || existingDestination.must;
    existingDestination.tips = tips || existingDestination.tips;

    const updatedDestination = await existingDestination.save();
    res.json(updatedDestination);
  } else {
    res.status(404).json({ message: "Destination not found" });
  }
});

export { createDestination, getAllDestinations, getDestination, updateDestination };
