import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import Components from "../models/components.model.js";

// Helper function to validate request body
const validateComponentsData = (data) => {
  const errors = [];

  const fields = [
    "stat",
    "fetures",
    "about",
    "chat",
    "map",
    "testimonial",
    "contactUs",
    "services",
    "portfolio",
    "packages",
  ];

  fields.forEach((field) => {
    if (typeof data[field] !== "boolean") {
      errors.push({ message: `${field} is required and must be a boolean` });
    }
  });

  return errors;
};

const createComponents = asyncMiddleware(async (req, res) => {
  const errors = validateComponentsData(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const newComponents = new Components(req.body);

  if (newComponents) {
    await newComponents.save();
    res.status(201).json(newComponents);
  } else {
    res.status(400).json({ message: "Components not created" });
  }
});

const getAllComponents = asyncMiddleware(async (req, res) => {
  const components = await Components.find({});
  if (!components || components.length === 0) {
    res.status(404).json({ message: "No Components documents found" });
  } else {
    res.status(200).json(components);
  }
});

const getComponents = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;
  const components = await Components.findById(_id);
  if (!components) {
    res.status(404).json({ message: "Components not found" });
  } else {
    res.status(200).json(components);
  }
});

const updateComponents = asyncMiddleware(async (req, res) => {
  const errors = validateComponentsData(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  let _id = req.params.id;
  const existingComponents = await Components.findById(_id);

  if (existingComponents) {
    Object.keys(req.body).forEach((key) => {
      existingComponents[key] = req.body[key];
    });

    const updatedComponents = await existingComponents.save();
    res.json(updatedComponents);
  } else {
    res.status(404).json({ message: "Components not found" });
  }
});

export {
  createComponents,
  getComponents,
  getAllComponents,
  updateComponents,
};
