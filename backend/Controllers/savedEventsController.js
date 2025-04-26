const savedEvent = require("../Models/savedEventsModel")

// add saved events
exports.saveEventController = async (req, res) => {
  console.log("Inside savedEventController")
  const userId = req.userId
  // console.log(userId);
  const { savedEvents } = req.body
  if (!savedEvents) {
    return res.status(400).json({ message: "Invalid event data" })
  }

  try {
    const existingEvent = await savedEvent.findOne({ userId })
    if (existingEvent) {
      if (existingEvent.savedEvents.includes(savedEvents)) {
        // console.log("Event is already in your saved collection!!");
        return res.status(406).json("Event is already in your saved collection!!")
      } else {
        existingEvent.savedEvents.push(savedEvents)
        await existingEvent.save()
        // console.log("Event is saved");
        res.status(200).json(existingEvent)
      }
    } else {
      const newSavedEvent = new savedEvent({ userId, savedEvents: [savedEvents] })
      await newSavedEvent.save()
      // console.log("Event is saved");
      res.status(200).json(newSavedEvent)
    }
  } catch (err) {
    // console.log(err);
    res.status(401).json(err)
  }
}

// get saved events
exports.getSavedEventsController = async (req, res) => {
  console.log("Inside getSavedEventsController")
  const userId = req.userId

  try {
    const allSavedEvents = await savedEvent.findOne({ userId })
    if (!allSavedEvents) {
      return res.status(404).json({ message: "No saved events found for this user" })
    }
    return res.status(200).json(allSavedEvents)
  } catch (err) {
    console.log(err)
    return res.status(401).json(err)
  }
}

// delete saved event by id
exports.deleteSavedEventsByIdController = async (req, res) => {
  console.log("Inside deleteSavedEventsByIdController")
  const userId = req.userId
  const { eventId } = req.body
  try {
    const allSavedEvents = await savedEvent.findOne({ userId })
    if (!allSavedEvents) {
      return res.status(404).json({ message: "No saved events found for this user" })
    }
    if (allSavedEvents.savedEvents.includes(eventId)) {
      allSavedEvents.savedEvents = allSavedEvents.savedEvents.filter((event) => event != eventId)
    } else {
      return res.status(404).json({ message: "Event not found in saved events" })
    }
    await allSavedEvents.save()
    return res.status(200).json(allSavedEvents)
  } catch (err) {
    console.log(err)
    return res.status(401).json(err)
  }
}

// delete all saved events
exports.deleteAllSavedEventsController = async (req, res) => {
  console.log("Inside deleteAllSavedEventsController")
  const userId = req.userId
  console.log(userId)

  try {
    const userSavedEvents = await savedEvent.findOneAndDelete({ userId: userId })

    console.log(userSavedEvents)

    if (!userSavedEvents) {
      console.log(`404`)

      return res.status(404).json({ message: "No saved events found for this user" })
    }

    // userSavedEvents.savedEvents = []; // Clear all saved events
    // await userSavedEvents.save();

    return res.status(200).json({ message: "All saved events have been deleted from the collection" })
  } catch (err) {
    console.log(err)
    return res.status(401).json(err)
  }
}
