import mongoose from "mongoose";

const subcategorySchema = mongoose.Schema(
  {
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
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
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SubCategory = mongoose.model("SubCategory", subcategorySchema);

export default SubCategory;
