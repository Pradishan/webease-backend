import mongoose from "mongoose";

const orderSubmitionSchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const OrderSubmition = mongoose.model("OrderSubmition", orderSubmitionSchema);

export default OrderSubmition;
