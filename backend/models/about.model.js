import mongoose from "mongoose";

const aboutSchema = mongoose.Schema(
    {
     image:{
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
  
  const About = mongoose.model("About", aboutSchema);
  
  export default About;