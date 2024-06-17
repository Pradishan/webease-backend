import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userOTPVerificationSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          // Regular expression for validating email addresses
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    otp: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: "5m" },
    },
  },
  {
    timestamps: true,
  }
);

userOTPVerificationSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);

  if (this.isModified("otp")) {
    this.otp = await bcrypt.hash(this.otp, salt);
  }

  next();
});

userOTPVerificationSchema.methods.matchOtp = async function (enteredOtp) {
  return await bcrypt.compare(enteredOtp, this.otp);
};

const UserOTPVerification = mongoose.model(
  "UserOTPVerification",
  userOTPVerificationSchema
);

export default UserOTPVerification;
