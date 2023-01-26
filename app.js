const express = require("express");
const path = require("path");

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

// handle 404 response
app.use((req, res) => {
  res.status(404).send("No resource found.");
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("An error occured.");
});

// listen for requests at the specified port (with callback on start listening)
app.listen(port, () =>
  console.log(`inventory-application listening on port ${port}`)
);
