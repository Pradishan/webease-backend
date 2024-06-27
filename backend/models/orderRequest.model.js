import mongoose from "mongoose";

const orderRequestSchema = mongoose.Schema(
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
    totalPrice: {
      type: String,
      default: "Pending",
      required: true,
    },
    advance: {
      type: String,
      default: "Pending",
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Rejected", "Pending", "accepted"],
    },
    statusClient: {
      type: String,
      default: "Pending",
      enum: ["Rejected", "Pending", "accepted"],
    },
  },
  {
    timestamps: true,
  }
);

const OrderRequest = mongoose.model("OrderRequest", orderRequestSchema);

export default OrderRequest;
