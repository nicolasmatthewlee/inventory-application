const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const async = require("async");

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

const createItem = (name, description, category, price, count, callback) => {
  // create new item and save to collection
  const item = new Item({ name, description, category, price, count });

  // save item to collection
  item.save((err) => {
    if (err) {
      console.log(err);
      callback(err, null);
      return;
    }
    // saved
    console.log("New Item: " + item);
    callback(null, name);
  });
};

// create items
const items = [
  {
    name: "Snow in Mukojima",
    description: "20th century woodblock print by Hasui Kawase.",
    category: "japanese",
    price: 200,
    count: 3,
  },
  {
    name: "Honmon-ji Temple in Ikegami",
    description: "20th century woodblock print by Hasui Kawase.",
    category: "japanese",
    price: 100,
    count: 2,
  },
  {
    name: "Kiyosu Bridge",
    description: "20th century woodblock print by Hasui Kawase.",
    category: "japanese",
    price: 80,
    count: 1,
  },
  {
    name: "Meguro Fudō Temple",
    description: "20th century woodblock print by Hasui Kawase.",
    category: "japanese",
    price: 30,
    count: 3,
  },
  {
    name: " Snow in the Front of the Shrine",
    description: "20th century woodblock print by Hasui Kawase.",
    category: "japanese",
    price: 40,
    count: 2,
  },
  {
    name: "Spring Night at Inokashira Park",
    description: "20th century woodblock print by Hasui Kawase.",
    category: "japanese",
    price: 100,
    count: 1,
  },
  {
    name: "Chūzenji, Utagahama",
    description: "20th century woodblock print by Hasui Kawase.",
    category: "japanese",
    price: 110,
    count: 3,
  },
  {
    name: "Morning at Cape Inubō",
    description: "20th century woodblock print by Hasui Kawase.",
    category: "japanese",
    price: 100,
    count: 2,
  },
  {
    name: "Nagoya Castle",
    description:
      "20th century woodblock print by Hasui Kawase, from the series Selected Views of the Tôkaidô Road.",
    category: "japanese",
    price: 190,
    count: 2,
  },
  {
    name: "Snow at Sekiguchi",
    description: "20th century woodblock print by Hasui Kawase.",
    category: "japanese",
    price: 80,
    count: 4,
  },
  {
    name: "Girl at Sewing Machine",
    description: "20th century painting by Edward Hopper.",
    category: "american",
    price: 80,
    count: 2,
  },
  {
    name: "Gas",
    description: "20th century painting by Edward Hopper.",
    category: "american",
    price: 120,
    count: 1,
  },
  {
    name: "Office at Night",
    description: "20th century painting by Edward Hopper.",
    category: "american",
    price: 90,
    count: 3,
  },
];

saveItems = items.map(
  (i) => (callback) =>
    createItem(i.name, i.description, i.category, i.price, i.count, callback)
);

// saveItems and close connection
async.parallel(saveItems, () => mongoose.connection.close());
