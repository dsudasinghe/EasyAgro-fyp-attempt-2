const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  tittle: {
    type: String,
    required: true,
  },
  location: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timestamp: true,
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
