import mongoose from "mongoose";

const feedBackSchema = mongoose.Schema(
  {
    clientID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      default: "0",
      enum: ["0", "1", "2", "3", "4", "5"],
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Show", "Hide", "Pending"],
    },
  },
  {
    timestamps: true,
  }
);

const FeedBack = mongoose.model("FeedBack", feedBackSchema);

export default FeedBack;
