const {body,validationResult} = require('express-validator')

exports.register = [
  body("name", "Name is not valid")
    .exists({ checkNull: true })
    .isLength({ min: 6, max: 64 })
    .withMessage("Name should be between 6 and 64 characters"),
  body("email", "Email is not valid")
    .exists({ checkFalsy: true, checkNull: true })
    .trim()
    .isEmail()
    .isLength({ min: 6, max: 255 })
    .withMessage("Email should be between 6 and 255 characters"),

  body("password", "Password is not valid")
    .exists({ checkFalsy:true,checkNull: true })
    .isLength({ min: 6, max: 64 })
    .withMessage("Password should be between 6 and 64 characters")
];

exports.login = [
  body("email", "Email is not valid")
    .exists({ checkFalsy: true, checkNull: true })
    .trim()
    .isEmail()
    .isLength({ min: 6, max: 255 })
    .withMessage("Email should be between 6 and 255 characters"),

  body("password", "Password is not valid")
    .exists({ checkFalsy: true, checkNull: true })
    .isLength({ min: 6, max: 64 })
    .withMessage("Password should be between 6 and 64 characters"),
];

exports.verify = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array()[0].msg;
    return res.send({error: message});
  }
  return next();
};
