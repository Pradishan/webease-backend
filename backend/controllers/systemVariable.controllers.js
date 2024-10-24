import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import SystemVariable from "../models/systemVariabls.model.js";

// Helper function to validate request body
const validateSystemVariableData = (data) => {
  const errors = [];

  if (!data.map) {
    errors.push({ message: "Map is required" });
  }
  if (!data.calender) {
    errors.push({ message: "Calender is required" });
  }

  return errors;
};

const createSystemVariable = asyncMiddleware(async (req, res) => {
  const errors = validateSystemVariableData(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const { map, calender } = req.body;

  const newSystemVariable = new SystemVariable({
    map,
    calender,
  });

  if (newSystemVariable) {
    await newSystemVariable.save();
    res.status(201).json(newSystemVariable);
  } else {
    res.status(400).json({ message: "SystemVariable not created" });
  }
});

const getAllSystemVariables = asyncMiddleware(async (req, res) => {
  const systemVariables = await SystemVariable.find({});
  if (!systemVariables || systemVariables.length === 0) {
    res.status(404).json({ message: "No SystemVariables found" });
  } else {
    res.status(200).json(systemVariables);
  }
});

const getSystemVariable = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;
  const systemVariable = await SystemVariable.findById(_id);
  if (!systemVariable) {
    res.status(404).json({ message: "SystemVariable not found" });
  } else {
    res.status(200).json(systemVariable);
  }
});

const updateSystemVariable = asyncMiddleware(async (req, res) => {
  const errors = validateSystemVariableData(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  let _id = req.params.id;
  const { map, calender } = req.body;

  const existingSystemVariable = await SystemVariable.findById(_id);

  if (existingSystemVariable) {
    existingSystemVariable.map = map || existingSystemVariable.map;
    existingSystemVariable.calender = calender || existingSystemVariable.calender;

    const updatedSystemVariable = await existingSystemVariable.save();
    res.json(updatedSystemVariable);
  } else {
    res.status(404).json({ message: "SystemVariable not found" });
  }
});

export { createSystemVariable, getSystemVariable, getAllSystemVariables, updateSystemVariable };
