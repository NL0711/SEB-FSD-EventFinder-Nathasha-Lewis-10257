const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  eventWebsite: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  location_city: {
    type: String,
    required: true,
  },
  location_state: {
    type: String,
    required: true,
  },  
  audienceType: {
    type: String,
    default: "General",
  },
  eventType: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
})

const events = mongoose.model("events", eventSchema)

module.exports = events
