const config = require("./utils/config");
const express = require("express");
// eliminates try catch in async await by passing error to next middleware
require("express-async-errors");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
// use the middleware in all routes
app.use(middleware.tokenExtractor);

app.use("/api/users", userRouter);
// use the middleware only in /api/blogs routes
// via middleware chaining can also register to specific route in controller
app.use("/api/blogs", middleware.userExtractor, blogRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
