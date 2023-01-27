const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  khadija: {
    type: Boolean,
    default: false,
  },
  vivek: {
    type: Boolean,
    default: false,
  },
});

// create 'items' collections in db
const ItemModel = mongoose.model("items", ItemSchema);

module.exports = ItemModel;
