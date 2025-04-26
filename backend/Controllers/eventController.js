const events = require("../Models/eventModel")

// add event
exports.addEventController = async (req, res) => {
  console.log("Inside addEventController")
  const userId = req.userId
  // console.log(userId);
  const {
    eventName,
    eventDescription,
    eventWebsite,
    startDate,
    endDate,
    startTime,
    endTime,
    location_city,
    location_state,
    location_link,
    maxRegistrationCount,
    isFree,
    entryFee,
    paymentMode,
    audienceType,
    eventType,
    tags,
  } = req.body
  console.log(
    eventName,
    eventDescription,
    startDate,
    endDate,
    startTime,
    endTime,
    location_city,
    location_state,
    location_link,
    maxRegistrationCount,
    isFree,
    entryFee,
    paymentMode,
    audienceType,
    eventType,
    tags,
  )
  try {
    const eventEndDate = endDate || startDate
    const existingEvent = await events.findOne({ eventName, endDate: { $gte: new Date() } })
    if (existingEvent) {
      res.status(406).json("Event already exists.. Please Check!!")
    } else {
      const newEvent = new events({
        eventName,
        eventDescription,
        eventWebsite,
        startDate,
        endDate: eventEndDate,
        startTime,
        endTime,
        location_city,
        location_state,
        location_link,
        maxRegistrationCount,
        isFree,
        entryFee,
        paymentMode,
        audienceType,
        eventType,
        tags,
        userId,
      })
      await newEvent.save()
      res.status(200).json(newEvent)
    }
  } catch (err) {
    res.status(401).json(err)
  }
}

// get events for home page
exports.getHomeEventsController = async (req, res) => {
  console.log("Inside getHomeEventsController")
  try {
    const homeEvents = await events.find().limit(5)
    res.status(200).json(homeEvents)
  } catch (err) {
    res.status(401).json(err)
  }
}

// get all events
exports.getAllEventsController = async (req, res) => {
  console.log("Inside getAllEventsController")
  const searchKey = req.query.search
  // console.log(searchKey);
  const query = searchKey
    ? { eventName: { $regex: searchKey, $options: "i" } } // Case-insensitive search
    : {} // Empty query to fetch all documents
  try {
    const allEvents = await events.find(query)

    res.status(200).json(allEvents)
  } catch (err) {
    res.status(401).json(err)
  }
}

// get user events
exports.getUserEventsController = async (req, res) => {
  console.log("Inside getUserEventsContoller")
  const userId = req.userId
  try {
    const allUserEvents = await events.find({ userId })
    res.status(200).json(allUserEvents)
  } catch (err) {
    res.status(401).json(err)
  }
}

// get event by id
exports.getEventDetailsController = async (req, res) => {
  console.log("Inside getEventDetailsController")
  const id = req.params.id
  
  // Log the received ID for debugging
  console.log("Requested event ID:", id)
  
  try {
    // Check if ID is a valid MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log("Invalid ObjectId format:", id)
      return res.status(400).json({ message: "Invalid event ID format" })
    }
    
    const currentEvent = await events.findById(id)
    
    // Check if event was found
    if (!currentEvent) {
      console.log("Event not found with ID:", id)
      return res.status(404).json({ message: "Event not found" })
    }
    
    res.status(200).json(currentEvent)
  } catch (err) {
    console.error("Error in getEventDetailsController:", err)
    res.status(500).json({ error: err.message })
  }
}

// edit event
exports.editEventsController = async (req, res) => {
  console.log("Inside editEventsController")
  const id = req.params.id
  const userId = req.userId
  const {
    eventName,
    eventDescription,
    eventWebsite,
    startDate,
    endDate,
    startTime,
    endTime,
    location_city,
    location_state,
    location_link,
    maxRegistrationCount,
    isFree,
    entryFee,
    paymentMode,
    audienceType,
    eventType,
    tags,
  } = req.body
  try {
    const updateEvent = await events.findByIdAndUpdate(
      id,
      {
        eventName,
        eventDescription,
        eventWebsite,
        startDate,
        endDate,
        startTime,
        endTime,
        location_city,
        location_state,
        location_link,
        maxRegistrationCount,
        isFree,
        entryFee,
        paymentMode,
        audienceType,
        eventType,
        tags,
        userId,
      },
      { new: true },
    )
    res.status(200).json(updateEvent)
  } catch (err) {
    res.status(401).json(err)
  }
}

// delete event
exports.removeEventController = async (req, res) => {
  console.log("Inside removeEventController")
  const { id } = req.params
  try {
    const deleteEvent = await events.findByIdAndDelete({ _id: id })
    res.status(200).json(deleteEvent)
  } catch (err) {
    res.status(401).json(err)
  }
}
