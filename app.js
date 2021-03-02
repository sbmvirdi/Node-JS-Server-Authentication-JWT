const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const authRouter = require('./routes/auth');

app.use("/api/v1/user", authRouter);
dotenv.config();

mongoose.connect(process.env.MONGO_CONNECT_DB,
  { useNewUrlParser: true },
   { useUnifiedTopology: true },
   () => {
  console.log("Mongoose connected successfully!");
});

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

app.get('/',(req,res) =>{
    res.send("Hello this is new server");
});