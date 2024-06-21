import mongoose from "mongoose";

const revisionSchema = mongoose.Schema(
  {
    clientID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    files: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      default: "Pending",
      enum: ["Accepted","Pending","Rejected"],
    },
  },
  {
    timestamps: true,
  }
);

const Revision = mongoose.model("Revision", revisionSchema);

export default Revision;
