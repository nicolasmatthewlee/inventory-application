const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

// import model
const Item = require("./models/item");

// connect to MongoDB database
const connectionString = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.yj7r55q.mongodb.net/?retryWrites=true&w=majority`;

// Two types of errors on Mongoose connection
// 1. error on initial connection
// 2. error after initial connection established
// (in both cases, Mongoose will emit an 'error' event)

// handle with .catch() OR try/catch+async/await
// ^^ .catch() is called when a Promise is rejected

// handle errors on initial connection
mongoose.connect(connectionString).catch((error) => console.log(error));

// handle errors after the initial the connection established
mongoose.connection.on("error", (err) => console.error(err));

// populate MongoDB database

const createItem = (name, description, category, price, count) => {
  // create new item and save to collection
  const item = new Item({ name, description, category, price, count });

  // save item to collection
  item.save((err) => {
    if (err) return console.log(err);
    // saved
    console.log("New Item: " + item);
  });
};

// RESUME HERE!!! CREATE ACTUAL INSTANCES
// create items
const items = [
  {
    name: "Snow in Mukojima",
    description: "woodblock print",
    category: "japanese",
    price: 200,
    count: 3,
  },
  {
    name: "Honmon-ji Temple in Ikegami",
    description: "woodblock print",
    category: "japanese",
    price: 100,
    count: 2,
  },
];

items.map((i) =>
  createItem(i.name, i.description, i.category, i.price, i.count)
);

// disconnect from database
// mongoose.connection.close();

// commented out for now because must occur after items.map complete,
// which is an async process
