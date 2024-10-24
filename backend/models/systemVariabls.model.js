import mongoose from "mongoose";

const SystemVariableSchema = new mongoose.Schema(
  {
    map: {
      type: String,
      required: true,
    },
    calender: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SystemVariable = mongoose.model("SystemVariable", SystemVariableSchema);

export default SystemVariable;
