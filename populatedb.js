const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

// populate MongoDB database

const connectionString = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.yj7r55q.mongodb.net/?retryWrites=true&w=majority`;

console.log(connectionString);
