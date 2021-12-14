// external import
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//internal import
const userHandler = require("./router/userHandler");
const landingRouter = require("./router/landingRouter");
const registrationRouter = require("./router/registrationRouter");
const loginRouter = require("./router/loginRouter");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

// initialization

const app = express();
dotenv.config();

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for html form data

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// set cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

// routes
app.use("/", landingRouter);
app.use("/register", registrationRouter);
app.use("/login", loginRouter);
app.use("/user", userHandler);

// 404 not found handler
app.use(notFoundHandler);

// default error handler
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`listening at port ${process.env.PORT}`);
});
