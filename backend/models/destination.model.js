import mongoose from "mongoose";

const destinationSchema = mongoose.Schema(
  {
    intro: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    culinaryDelights: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    must: [
      {
        point: {
          type: String,
          required: true,
        },
      },
    ],
    tips: [
      {
        tip: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;
