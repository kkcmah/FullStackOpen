const config = require("./utils/config");
const express = require("express");
// eliminates try catch in async await by passing error to next middleware
require("express-async-errors");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogs");
const middleware =require("./utils/middleware")

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use("/api/blogs", blogRouter);

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;
