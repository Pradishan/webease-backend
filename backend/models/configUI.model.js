import mongoose from "mongoose";

const configUISchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    themeID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Theme",
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ConfigUI = mongoose.model("ConfigUI", configUISchema);

export default ConfigUI;
