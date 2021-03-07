const userRouter = require('express').Router()
const validator = require('../validations')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const asyncHandler = require("express-async-handler")
const { response } = require('express')
const hashRounds = 12
const jwt = require('jsonwebtoken')


// post request for registering a new user to the server
userRouter.post('/register',validator.register,asyncHandler(validator.verify),async (req,res) =>{

    // hashing the password
    const hashedPass = await bcrypt.hash(req.body.password, hashRounds);
    // creating a user and passing all the details to the User Object
  const user  = new User({
      name: req.body.name,
      email:req.body.email,
      password:hashedPass
  });


  const foundUser = await User.findOne({email:req.body.email})
  if (foundUser) {
    // user already exists no need to sign up
     res.status(400).send({
      error:"User already exists"
    })
  }

  // saving the user to the mongoDB
  try{
    const savedUser = await user.save();
    res.status(200).send({
        name:savedUser.name,
        email:savedUser.email,
        date:savedUser.date
    })
  }catch(err){
     res.status(400).send(err);
  }

});

userRouter.post('/login',validator.login,asyncHandler(validator.verify),async (req,res)=>{

  // check if user exists in database or not
  const foundUser = await User.findOne({email:req.body.email})
  if(!foundUser){
    res.status(400).send({
      error:"No user exists with this email"
    })
  }


  // if the user is found in the database confirm its password 
  const passMatch = await bcrypt.compare(req.body.password,foundUser.password)
  if (passMatch) {
    res.status(200).send({
      email:req.body.email,
      date:foundUser.date,
      passwordMatch:passMatch
    })
  }

  // create a json web token for the user
  const token = jwt.sign({ _id: foundUser._id }, process.env.JWT_TOKEN_SECRET);
  

})

module.exports = userRouter;