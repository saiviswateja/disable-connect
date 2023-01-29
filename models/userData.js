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
        type: Number,
        required: true,
        default: 0
      }
    ],
    gender: {
      type: {
        type: String,
        enum: ["Male", "Female"],
      }
    },
    foodHistory: {
      type: Array,
      default: []
    },
    burnedCalories: {
      type: Number,
      required: false
    },
    maintainanceCalories: {
      type: Number,
      required: false
    },
    workOuts: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("userData", userSchema);
