const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

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

// use cors
const cors = require("cors");
app.use(cors());

// define port
const port = 3000;

// used to parse JSON body
app.use(express.json());

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
  Item.find({}, { __v: 0 }).exec((err, result) => {
    if (err) return next(err);
    // no error
    res.send(result);
  });
});

app.get("/api/categories", (req, res, next) => {
  Item.distinct("category").exec((err, result) => {
    if (err) return next(err);
    // no error
    res.send(result);
  });
});

app.post("/api/create", [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must be specified.")
    .isLength({ max: 100 })
    .withMessage("Name must not exceed 100 characters.")
    .escape(),
  body("description")
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 100 characters.")
    .escape(),
  body("category")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Category must be specified.")
    .escape(),
  body("price")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Price must be specified.")
    .isNumeric()
    .withMessage("Price must be a number.")
    .escape(),
  body("quantity")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Quantity must be specified.")
    .isNumeric()
    .withMessage("Quantity must be a number.")
    .escape(),
  (req, res, next) => {
    // get validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // there are validation errors
      return res.json({ success: false, errors: errors.array() });
    }
    // no validation errors

    // save to collection
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      count: req.body.quantity,
    });

    item.save((err) => {
      if (err) return res.json({ success: false, err: [err] });
      // saved
      res.json({ success: true });
    });
  },
]);

// 404 responses are not captured by express middleware
// create 404 error and forward to error handler with next()
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send("Resource not found.");
  } else {
    console.log(err);
    res.status(500).send("An unknown error occured.");
  }
});

// listen for requests at the specified port (with callback on start listening)
app.listen(port, () =>
  console.log(`inventory-application listening on port ${port}`)
);
