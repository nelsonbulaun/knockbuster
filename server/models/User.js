const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
        email: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        address: [{ type: Object, required: false }],
        phonenumber: { type: String, required: false },
    });


// Virtual for author's URL
UserSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/user/${this._id}`;
});

// Export model
module.exports = mongoose.model("User", UserSchema);