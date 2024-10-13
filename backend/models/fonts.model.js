import mongoose from "mongoose";

const fontSchema = new mongoose.Schema(
  {
    font1: {
      type: String,
      default: "Poppins", // Updated default font
    },
    font2: {
      type: String,
      default: "Roboto", // Updated default font to Roboto
    },
    font3: {
      type: String,
      default: "Lato", // Updated default font to Lato
    },
    font4: {
      type: String,
      default: "Montserrat", // Updated default font to Montserrat
    },
    font5: {
      type: String,
      default: "Inter", // Default remains unchanged
    },
  },
  {
    timestamps: true,
  }
);

const Fonts = mongoose.model("Fonts", fontSchema);

export default Fonts;
