import mongoose from "mongoose";

const themeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    colorID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Colors",
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

const Theme = mongoose.model("Theme", themeSchema);

export default Theme;
