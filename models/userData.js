const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    weight: [
      {
        type: Number,
        required: true,
      },
    ],
    height: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    userCred: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userCred",
      required: true,
    },
    calories: [
      {
        type: String,
        required: true,
      },
    ],
    gender: {
      type: {
        type: String,
        enum: ["Male", "Female"],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userData", userSchema);
