require("dotenv").config();
const express = require("express");
const cors = require("cors");
const auth = require("./routes/auth");
const user = require("./routes/userData");
const food = require("./routes/Food");
const calorieBurned = require("./routes/CalorieBurned");
const bodyParser = require("body-parser");
const app = express();
const connectDB = require("./config/db");
connectDB();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(bodyParser.json());
app.use("/", auth);
app.use("/user", user);
app.use("/food", food);
app.use("/calorieBurned", calorieBurned);


app.listen(8000, () => {
  console.log("Application started at the server side");
});
