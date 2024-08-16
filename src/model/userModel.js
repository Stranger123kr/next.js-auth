import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: [true, "username already present choose another"],
  },

  email: {
    type: String,
    required: [true, "please provide email"],
    unique: [true, "email already present"],
  },

  password: {
    type: String,
    required: [true, "please provide password"],
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  forgotPasswordToken: String,
  forgotPasswordTokenExpire: Date,
});

// -------------------------------------

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
