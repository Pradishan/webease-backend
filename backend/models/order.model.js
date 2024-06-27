import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    clientID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    subCategoryID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "SubCategory",
    },
    name: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    colorTheme: {
      type: String,
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
      enum: ["InProgress", "UnderRevision","Completed","Cancelled","Delivered","Rejected","Pending","OnHold","Shipped","OutForDelivery","Returned","Refunded"],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
