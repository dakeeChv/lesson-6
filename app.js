var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var companyRouter = require("./routes/company");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// root path
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/company", companyRouter);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;

  return res.status(status).json({
    status: status,
    message: err.message,
    validation: err.validation,
  });
});

module.exports = app;
