const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  username: { type: String, required: true },
  date: { type: Date, requried: false },
  products: [
    {
      productId: { type: Number, required: false },
      productType: {
        type: { type: String, required: false },
        price: { type: Number, required: false },
      },
      quantity: { type: Number, required: false },
    },
  ],
});

// Virtual for Cart's URL
CartSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/cart/${this._id}`;
});

// Export model
module.exports = mongoose.model("Cart", CartSchema);
