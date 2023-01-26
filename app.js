const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const Item = require("./models/item");

// connect to mongoDB
const connectionString = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.yj7r55q.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(connectionString);
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

// create express application
const app = express();

// define port
const port = 3000;

// load static files from client/build
app.use(express.static(path.join(__dirname, "client", "build")));

// define routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// express automatically catches errors occurring in synchronous code
// (will be handled by error handler defined after all routes)

// errors returned by asynchronous functions must be passed into the
// next() function
// ex) if (err) next(err)
app.get("/api", (req, res, next) => {
  Item.find().exec((err, items) => {
    if (err) return next(err);
    // no error
    res.send(items);
  });
});

// 404 responses are not captured by express middleware
// create 404 error and forward to error handler with next()
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  err.status === 404
    ? res.status(404).send("Resource not found.")
    : res.status(500).send("An unknown error occured.");
});

// listen for requests at the specified port (with callback on start listening)
app.listen(port, () =>
  console.log(`inventory-application listening on port ${port}`)
);
