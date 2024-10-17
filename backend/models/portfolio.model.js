import mongoose from "mongoose";

const portfolioSchema = mongoose.Schema(
  {
    serviceTitle: {
      type: String,
      required: true,
    },
    image:{
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,catogories
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

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
