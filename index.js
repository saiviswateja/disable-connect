require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/users/User");
const authRouter = require("./routes/auth");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/", authRouter);

const uri =
  "mongodb+srv://hackuser:LFH4ubZBXZaaWK9i@cluster0.fvgxptl.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    if (err) {
      console.log("Error connecting the db");
      return;
    }
    console.log("database connected");
  }
);

// If modifying these scopes, delete token.json.

const port = process.env.PORT || 8000;

app.listen(8000, () => {
  console.log(
    "Application started at the server side",
    process.env.FRONTEND_URL
  );
});
