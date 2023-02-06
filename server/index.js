const express = require("express");
const mongoose = require("mongoose");
const ItemModel = require("./models/Items");
const cors = require("cors");
const app = express();

require("dotenv").config();
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://vbadiani:${process.env.DB_PASSWORD}@cluster0.0voqkux.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri);

app.get("/getItems", (req, res) => {
  ItemModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  }).sort({ createdAt: -1 });
});

app.post("/createItem", async (req, res) => {
  const item = req.body;
  const newItem = new ItemModel(item);

  await newItem.save();

  // console.log(newItem);
  res.json(newItem);
});

app.delete("/deleteItem/:id", async (req, res) => {
  const id = req.params.id;

  ItemModel.findByIdAndDelete(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
});

app.patch("/updateItem/:id", async (req, res) => {
  // .trim() function needed to remove whitespace from id in database
  const id = req.params.id.trim();

  const updatedItem = await ItemModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

// checkmark item as complete (crossthrough)
app.patch("/completeItem/:id", async (req, res) => {
  const id = req.params.id.trim();
  // console.log(id);
  await ItemModel.findByIdAndUpdate(id, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
  }).then((result) => res.json(result));
});

// check khadija or vivek as true or false
app.patch("/assignItemToPerson/:id", async (req, res) => {
  const id = req.params.id.trim();

  await ItemModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  }).then((result) => res.json(result));
});

app.listen(process.env.DEV_PORT || 3001, () => {
  console.log(`Express server listening on port ${process.env.DEV_PORT}`);
});
