import mongoose from "mongoose";

const packgesSchema = mongoose.Schema(
    {
        service: {
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
          unique: true,
        },
        price: {
            type: String,
            required: true,
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
const Packges = mongoose.model("Packges", packgesSchema);

export default Packges;