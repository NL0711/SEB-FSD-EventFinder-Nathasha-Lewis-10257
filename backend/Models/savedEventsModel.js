const mongoose = require("mongoose")

const savedEventsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  // storing event id of saved events by the user
  savedEvents: {
    type: Array,
    required: true,
  },
})

const savedEvents = mongoose.model("savedEvents", savedEventsSchema)

module.exports = savedEvents
