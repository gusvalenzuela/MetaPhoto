const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClimbSchema = new Schema({
  name: { type: String, required: true },
  rating: { type: String, required: false },
  location: [],
  url: { type: String, required: false },
});

const Climb = mongoose.model("Climb", ClimbSchema);

module.exports = Climb;
