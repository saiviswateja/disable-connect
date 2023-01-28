const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
let DATABASE = process.env.DATABASE;

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
