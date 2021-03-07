const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const authRouter = require('./routes/auth');

dotenv.config();

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGO_CONNECT_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Mongoose connected successfully!");
  }
);

app.use("/api/v1/user", authRouter);

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

app.get('/',(req,res) =>{
    res.send("Hello this is new server");
});