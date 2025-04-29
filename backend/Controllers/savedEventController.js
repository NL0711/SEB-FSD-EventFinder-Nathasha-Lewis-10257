const savedEvents = require("../Models/savedEventModel")
const events = require("../Models/eventModel") // Need this to fetch event details

// Save an event
exports.saveEventController = async (req, res) => {
  const userId = req.userId
  const { eventId } = req.body

  if (!eventId) {
    return res.status(400).json({ message: "Event ID is required." })
  }

  try {
    // Check if already saved
    const existingSave = await savedEvents.findOne({ userId, eventId })
    if (existingSave) {
      return res.status(409).json({ message: "Event already saved." })
    }

    // Create new saved event record
    const newSave = new savedEvents({ userId, eventId })
    await newSave.save()
    res.status(201).json({ message: "Event saved successfully.", savedEvent: newSave })
  } catch (error) {
    if (error.code === 11000) {
      // Handle potential race condition duplicate error
      return res.status(409).json({ message: "Event already saved (concurrent request)." })
    }
    res.status(500).json({ message: "Failed to save event.", error: error.message })
  }
}

exports.removeSavedEventController = async (req, res) => {
  const userId = req.userId
  const { eventId } = req.body

  if (!eventId) {
    return res.status(400).json({ message: "Event ID is required." })
  }

  try {
    const result = await savedEvents.deleteOne({ userId, eventId })
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Saved event not found." })
    }
    res.status(200).json({ message: "Event removed from saved list." })
  } catch (error) {
    res.status(500).json({ message: "Failed to remove saved event.", error: error.message })
  }
}

exports.getUserSavedEventIdsController = async (req, res) => {
  const userId = req.userId
  try {
    const savedEventRecords = await savedEvents.find({ userId }).select("eventId -_id")
    const eventIds = savedEventRecords.map((record) => record.eventId)
    res.status(200).json(eventIds)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch saved event IDs.", error: error.message })
  }
}

exports.getSavedEventDetailsController = async (req, res) => {
  const userId = req.userId
  try {
    const savedEventRecords = await savedEvents.find({ userId })
    if (!savedEventRecords || savedEventRecords.length === 0) {
      return res.status(200).json([])
    }

    const eventIds = savedEventRecords.map((record) => record.eventId)

    const eventDetails = await events.find({ _id: { $in: eventIds } })

    res.status(200).json(eventDetails)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch saved event details.", error: error.message })
  }
} 