const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  year: { type: Number, required: false },
  genre: [{ type: String, required: false }],
  certificate: { type: String, required: false },
  director: [{ type: String, required: false }],
  writers: [{ type: String, required: false }],
  actors: [{ type: String, required: false }],
  productType: [
    {
      type: { type: String, required: false },
      price: { type: Number, required: false },
    },
  ],
  price: { type: Number, required: true },
  image: { type: String, required: false },
  trailerImage: { type: String, required: false },
  dateAdded: { type: Date, requried: false },
  approved: {type: Boolean, required: true}
});

// Virtual for author's URL
ProductSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/product/${this._id}`;
});

// Export model
module.exports = mongoose.model("Product", ProductSchema);
