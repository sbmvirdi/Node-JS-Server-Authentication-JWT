const userRouter = require('express').Router();
const {registerValidation,loginValidation} = require('../validations')
const User = require('../models/User')

// post request for registering a new user to the server
userRouter.post('/register',async (req,res) =>{

    // creating a user and passing all the details to the 
  const user  = new User({
      name: req.body.name,
      email:req.body.email,
      password:req.body.password
  });

  const isValid = registerValidation(user);
  
  if(isValid)   
     return res.status(400).send(error.details[0].message);

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

module.exports = userRouter;