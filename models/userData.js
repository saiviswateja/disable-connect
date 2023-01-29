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
    foodHistoty: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("userData", userSchema);
