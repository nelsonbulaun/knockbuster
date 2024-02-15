const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const WatchList = new Schema({
  username: { type: String, required: true },
  listname: { type: String, required: true },
  date: { type: Date, requried: false },
  products: [
    {
      productId: { type: Number, required: false },
      productType: {
        type: { type: String, required: false },
        price: { type: Number, required: false },
      }},
  ],
});

// Virtual for WatchList's URL
WatchList.virtual("url").get(function () {
  return `/WatchList/${this._id}`;
});

// Export model
module.exports = mongoose.model("WatchList", WatchList);