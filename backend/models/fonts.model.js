import mongoose from "mongoose";

const fontSchema = new mongoose.Schema(
  {
    font1: {
      type: String,
      default: "Roboto", // Add your default font here
      // required: true,
    },
    font2: {
      type: String,
      default: "Arial", // Add your default font here
      // required: true,
    },
    font3: {
      type: String,
      default: "Helvetica", // Add your default font here
      // required: true,
    },
    font4: {
      type: String,
      default: "Times New Roman", // Add your default font here
      // required: true,
    },
    font5: {
      type: String,
      default: "Courier New", // Add your default font here
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Fonts = mongoose.model("Fonts", fontSchema);

export default Fonts;
