const mongoose = require("mongoose")

const pastEventsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  pastEvents: {
    type: Array,
    required: true,
  },
})

const pastEvents = mongoose.model("pastEvents", pastEventsSchema)

module.exports = pastEvents
