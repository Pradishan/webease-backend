import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const tempUserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          // Regular expression for validating email addresses
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\+?[1-9]\d{1,14}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    address: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: "30m" },
    },
  },
  {
    timestamps: true,
  }
);

tempUserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);

    if (this.isModified("otp")) {
        this.otp = await bcrypt.hash(this.otp, salt);
    }

    if (this.isModified("password")) {
      // Validate password before hashing
      const passwordValidation =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          this.password
        );
      if (!passwordValidation) {
        next(
          new Error(
            "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
          )
        );
      }
    }
    next();
  });
  
  tempUserSchema.methods.matchOtp = async function (enteredOtp) {
    return await bcrypt.compare(enteredOtp, this.otp);
  };

const TempUser = mongoose.model("TempUser", tempUserSchema);

export default TempUser;
