import mongoose from "mongoose";

const componentSchema = new mongoose.Schema(
  {
    banner: {
      type: Boolean,
      required: true,
    },
    stat: {
      type: Boolean,
      required: true,
    },
    about: {
      type: Boolean,
      required: true,
    },
    chat: {
      type: Boolean,
      required: true,
    },
    map: {
      type: Boolean,
      required: true,
    },
    testimonial: {
      type: Boolean,
      required: true,
    },
    contactUs: {
      type: Boolean,
      required: true,
    },
    services: {
      type: Boolean,
      required: true,
    },
    subServices: {
      type: Boolean,
      required: true,
    },
    portfolio: {
      type: Boolean,
      required: true,
    },
    packages: {  // Corrected the typo here as well
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Components = mongoose.model("Components", componentSchema);

export default Components;
