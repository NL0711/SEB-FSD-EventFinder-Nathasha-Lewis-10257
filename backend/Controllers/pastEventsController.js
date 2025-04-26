const pastEvent = require("../Models/pastEventsModel")

// add past events
exports.saveEventController = async (req, res) => {
  console.log("Inside pastEventController")
  const userId = req.userId
}

// get past events
exports.getPastEventsController = async (req, res) => {
  console.log("Inside getPastEventsController")
  const userId = req.userId

  try {
    const allPastEvents = await pastEvent.findOne({ userId })
    if (!allPastEvents) {
      return res.status(404).json({ message: "No past events found for this user" })
    }
    return res.status(200).json(allPastEvents)
  } catch (err) {
    console.log(err)
    return res.status(401).json(err)
  }
}

// delete past event by id
exports.deletePastEventByIdController = async (req, res) => {
  console.log("Inside deletePastEventByIdController")
  const userId = req.userId
  const { eventId } = req.body
  try {
    const allPastEvents = await pastEvent.findOne({ userId })
    if (!allPastEvents) {
      return res.status(404).json({ message: "No past events found for this user" })
    }
    if (allPastEvents.pastEvents.includes(eventId)) {
      allPastEvents.pastEvents = allPastEvents.pastEvents.filter((event) => event != eventId)
    } else {
      return res.status(404).json({ message: "Event not found in past events" })
    }
    await allPastEvents.save()
    return res.status(200).json(allPastEvents)
  } catch (err) {
    console.log(err)
    return res.status(401).json(err)
  }
}

// delete all past events
exports.deleteAllPastEventsController = async (req, res) => {
  console.log("Inside deleteAllPastEventsController")
  const userId = req.userId
  console.log(userId)
  try {
    const userPastEvents = await pastEvent.findOneAndDelete({ userId: userId })

    console.log(userPastEvents)

    if (!userPastEvents) {
      console.log(`404`)

      return res.status(404).json({ message: "No past events found for this user" })
    }

    return res.status(200).json({ message: "All past events have been deleted from the collection" })
  } catch (err) {
    console.log(err)
    return res.status(401).json(err)
  }
}
