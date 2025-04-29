const mongoose = require("mongoose")

const savedEventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming your user model is named 'User'
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event", // Assuming your event model is named 'Event'
    required: true,
  },
})

// Ensure a user can save an event only once
savedEventSchema.index({ userId: 1, eventId: 1 }, { unique: true })

const savedEvents = mongoose.model("savedEvents", savedEventSchema)

module.exports = savedEvents 