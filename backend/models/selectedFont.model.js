import mongoose from "mongoose";

const selectedFontSchema = new mongoose.Schema(
  {
    selectedFont: {
      type: String,
      required: true, // This field is required
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const SelectedFont = mongoose.model("SelectedFont", selectedFontSchema);

export default SelectedFont;
