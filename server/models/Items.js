const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    // createdAt: {
    //   type: Date,
    //   immutable: true,
    //   default: () => Date.now(),
    // },
    // updatedAt: {
    //   type: Date,
    //   immutable: true,
    //   default: () => Date.now(),
    // },
    personOne: {
      type: Boolean,
      default: false,
    },
    personTwo: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// create 'items' collections in db
const ItemModel = mongoose.model("items", ItemSchema);

module.exports = ItemModel;
