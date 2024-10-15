import mongoose from "mongoose";

const aboutSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    banner: {
      text: {
        type: String,
        required: true,
      },
      subText: {
        type: String,
        required: true,
      },
    },
    about: {
      image: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    stat: [
      {
        title: {
          type: String,
          required: true,
        },
        value: {
          type: Number,
          required: true,
        },
      },
    ],
    fetures: [
      {
        title: {
          type: String,
          required: true,
        },
        text: {
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

const About = mongoose.model("About", aboutSchema);

export default About;
