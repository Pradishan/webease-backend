import mongoose from "mongoose";

const fontSchema = new mongoose.Schema(
  {
    font1: {
      type: String,
      default: "Poppins", // Updated default font
      // required: true,
    },
    font2: {
      type: String,
      default: "Inter", // Updated default font
      // required: true,
    },
    font3: {
      type: String,
      default: "Arial", // Default remains unchanged
      // required: true,
    },
    font4: {
      type: String,
      default: "Helvetica", // Default remains unchanged
      // required: true,
    },
    font5: {
      type: String,
      default: "Georgia", // Updated default font
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Fonts = mongoose.model("Fonts", fontSchema);

export default Fonts;
