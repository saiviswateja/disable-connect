const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contactNo: {
      type: Number,
      required: true,
      minLength: 10,
      maxLength: 10,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      unique: true,
    },
    userData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userData",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userCred", userSchema);
