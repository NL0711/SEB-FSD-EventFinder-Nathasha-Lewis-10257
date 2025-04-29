const mongoose = require("mongoose")

const appliedEventSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
    unique: true,
  },
  registeredUser: [
    {
      userId: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      appliedAt: {
        type: Date,
        default: Date.now,
        immutable: true,
      },
    },
  ],
})

const appliedEvents = mongoose.model("appliedEvents", appliedEventSchema)

module.exports = appliedEvents