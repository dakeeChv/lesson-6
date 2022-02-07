const { User } = require("../model/user");
const db = require("../db");
var { validationResult } = require("express-validator");

exports.register = async (req, res, next) => {
  try {
    let { username, password, email } = req.body;

    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error = new Error("Invalid Input");
      error.statusCode = 400;
      error.validation = errors.array();
      return next(error);
    }

    let user = new User(username, password, email);
    user.password = await user.hashPassword(password);

    db.query(
      `SELECT username FROM users WHERE username = '${username}'`,
      (err, result) => {
        if (err) return next(err);
        if (result.length <= 0) {
          const query = `INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)`;
          db.query(
            query,
            [user.username, user.password, user.email, user.role],
            (err, result) => {
              return res.status(201).json({
                status: "OK",
                message: "User created successfully",
              });
            }
          );
        } else {
          err = new Error("User Already exixts");
          err.statusCode = 409;
          return next(err);
        }
      }
    );
  } catch (error) {
    return next(error);
  }
};
