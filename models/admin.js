const mongoose = require("mongoose");
const validator = require("validator");
const apiURL = require("../constants");

const adminCredSchema = new mongoose.Schema({
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
    minlength: 7,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    // default: `${apiURL}/UserProfile/defaultUser.png`,
  },
  contactNo: {
    type: Number,
    required: true,
    minLength: 10,
    maxLength: 10,
  },
  permissions: [
    {
      section: String,
      permissionType: String,
    },
  ],
  verificationToken: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },

  logs: [
    {
      timestamp: {
        type: Date,
      },
      message: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("admin", adminCredSchema);

//  = adminCred;
