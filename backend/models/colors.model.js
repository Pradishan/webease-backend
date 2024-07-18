import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    primary: {
      light: {
        type: String,
        default: "#80BBFF", // Add your default light color here
        required: true,
      },
      DEFAULT: {
        type: String,
        default: "#1E40AF", // Add your default DEFAULT color here
        required: true,
      },
      dark: {
        type: String,
        default: "#1E3A8A", // Add your default dark color here
        required: true,
      },
    },
    secondary: {
      light: {
        type: String,
        default: "#8781DB", // Add your default light color here
        required: true,
      },
      DEFAULT: {
        type: String,
        default: "#6C68AD", // Add your default DEFAULT color here
        required: true,
      },
      dark: {
        type: String,
        default: "#4B4990", // Add your default dark color here
        required: true,
      },
    },
    accent: {
      light: {
        type: String,
        default: "#FFEDD5", // Add your default light color here
        required: true,
      },
      DEFAULT: {
        type: String,
        default: "#FDBA74", // Add your default DEFAULT color here
        required: true,
      },
      dark: {
        type: String,
        default: "#FB923C", // Add your default dark color here
        required: true,
      },
    },
    neutral: {
      light: {
        type: String,
        default: "#F3F4F6", // Add your default light color here
        required: true,
      },
      DEFAULT: {
        type: String,
        default: "#9CA3AF", // Add your default DEFAULT color here
        required: true,
      },
      dark: {
        type: String,
        default: "#4B5563", // Add your default dark color here
        required: true,
      },
    },
    success: {
      light: {
        type: String,
        default: "#D1FAE5", // Add your default light color here
        required: true,
      },
      DEFAULT: {
        type: String,
        default: "#10B981", // Add your default DEFAULT color here
        required: true,
      },
      dark: {
        type: String,
        default: "#065F46", // Add your default dark color here
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
