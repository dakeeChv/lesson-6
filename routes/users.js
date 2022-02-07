var express = require("express");
var router = express.Router();
var { register } = require("../controllers/userController");
var { body } = require("express-validator");

router.post(
  "/",
  [
    body("username").not().isEmpty().withMessage("Username is required"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 5 characters long"),
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("must be email"),
  ],
  register
);

module.exports = router;
