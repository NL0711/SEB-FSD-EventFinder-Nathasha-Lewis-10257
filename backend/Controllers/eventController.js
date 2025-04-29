const events = require("../Models/eventModel")

exports.addEventController = async (req, res) => {
  const userId = req.userId
  const {
    eventName,
    eventDescription,
    eventWebsite,
    image, 
    startDate,
    endDate,
    startTime,
    endTime,
    location_city,
    location_state,
    maxRegistrations, 
    audienceType,
    eventType,
    organizer, 
    tags,
    eligibility, 
    registrationRequirements 
  } = req.body
  
  try {
    const eventEndDate = endDate || startDate 
    const existingEvent = await events.findOne({ eventName, startDate })
    if (existingEvent) {
      res.status(406).json("An event with the same name and start date already exists.")
    } else {
      const newEvent = new events({
        eventName,
        eventDescription,
        eventWebsite,
        image, 
        startDate,
        endDate: eventEndDate,
        startTime,
        endTime,
        location_city,
        location_state,
        maxRegistrations, 
        audienceType,
        eventType,
        organizer, 
        tags,
        eligibility, 
        registrationRequirements, 
        userId,
      })
      await newEvent.save()
      res.status(200).json(newEvent)
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to add event due to server error", error: err.message }); 
  }
}

exports.getHomeEventsController = async (req, res) => {
  try {
    const homeEvents = await events.find().limit(5)
    res.status(200).json(homeEvents)
  } catch (err) {
    res.status(401).json(err)
  }
}

exports.getAllEventsController = async (req, res) => {
  const searchKey = req.query.search
  const query = searchKey
    ? { eventName: { $regex: searchKey, $options: "i" } } 
    : {} 
  try {
    const allEvents = await events.find(query)
    res.status(200).json(allEvents)
  } catch (err) {
    res.status(401).json(err)
  }
}

exports.getUserEventsController = async (req, res) => {
  const userId = req.userId
  try {
    const allUserEvents = await events.find({ userId })
    res.status(200).json(allUserEvents)
  } catch (err) {
    res.status(401).json(err)
  }
}

exports.getEventDetailsController = async (req, res) => {
  const id = req.params.id
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid event ID format" })
    }
    
    const currentEvent = await events.findById(id).select('+tags')
    
    if (!currentEvent) {
      return res.status(404).json({ message: "Event not found" })
    }
    
    res.status(200).json(currentEvent)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.removeEventController = async (req, res) => {
  const { id } = req.params
  try {
    const deleteEvent = await events.findByIdAndDelete({ _id: id })
     if (!deleteEvent) {
        return res.status(404).json({ message: "Event not found for deletion" });
    }
    res.status(200).json(deleteEvent)
  } catch (err) {
     res.status(500).json({ message: "Failed to delete event", error: err.message })
  }
}