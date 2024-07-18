import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    primary: {
      light: {
        type: String,
        required: true,
      },
      DEFAULT: {
        type: String,
        required: true,
      },
      dark: {
        type: String,
        required: true,
      },
    },
    secondary: {
      light: {
        type: String,
        required: true,
      },
      DEFAULT: {
        type: String,
        required: true,
      },
      dark: {
        type: String,
        required: true,
      },
    },
    accent: {
      light: {
        type: String,
        required: true,
      },
      DEFAULT: {
        type: String,
        required: true,
      },
      dark: {
        type: String,
        required: true,
      },
    },
    neutral: {
      light: {
        type: String,
        required: true,
      },
      DEFAULT: {
        type: String,
        required: true,
      },
      dark: {
        type: String,
        required: true,
      },
    },
    success: {
      light: {
        type: String,
        required: true,
      },
      DEFAULT: {
        type: String,
        required: true,
      },
      dark: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Colors = mongoose.model("Colors", colorSchema);

export default Colors;
