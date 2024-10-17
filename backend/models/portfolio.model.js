import mongoose from "mongoose";

const portfolioSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image:{
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    catogory: {
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
