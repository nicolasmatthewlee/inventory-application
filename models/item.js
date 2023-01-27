const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// each schema maps to a MongoDB collection, defining the shape
// of documents within that collection
// _id is autommatically added to schemas
const itemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  count: { type: Number, required: true },
});

// convert schema into a model that can be worked with
// mongoose.model(modelName, schema)
// the modelName is the name of the collection your model is for
// mongoose looks for the plural, lowercase version of your model name
// ex) 'Tank' model -> 'tanks' collection
module.exports = mongoose.model("Item", itemSchema);
