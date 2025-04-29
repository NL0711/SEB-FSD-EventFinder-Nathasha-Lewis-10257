const appliedEvents = require("../Models/appliedEventsModel")

exports.applyEventController = async (req, res) => {
  const { eventId, registeredUser } = req.body
  try {
    const existingEvent = await appliedEvents.findOne({ eventId })
    if (existingEvent) {
      const alreadyApplied = existingEvent.registeredUser.some(
        (user) => user.userId === registeredUser.userId && user.username === registeredUser.username,
      )

      if (alreadyApplied) {
        return res.status(406).json("You have already applied for this event")
      }

      existingEvent.registeredUser.push(registeredUser)
      await existingEvent.save()
      return res.status(200).json(existingEvent)
    } else {
      const newRegistration = new appliedEvents({ eventId, registeredUser: [registeredUser] })
      await newRegistration.save()
      res.status(200).json(newRegistration)
    }
  } catch (err) {
    res.status(401).json(err)
  }
}

// get applied events
exports.getUserAppliedEvents = async (req, res) => {
  try {
    const userEmail = req.userEmail 
    if (!userEmail) { 
        return res.status(401).json({ message: "Authorization Error: User email missing." });
    }

    const events = await appliedEvents.find(
      { "registeredUser.email": userEmail }, 
      { eventId: 1, _id: 0 }, 
    )

    if (!events || events.length === 0) {
      return res.status(200).json([]) // Return empty array instead of 404
    }

    return res.status(200).json(events)
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error })
  }
}

exports.getApplicationDetails = async (req, res) => {
  const eventId = req.params.id
  try {
    const allAppliedUsers = await appliedEvents.findOne({ eventId: eventId })
    if (!allAppliedUsers || allAppliedUsers.registeredUser.length === 0) {
      return res.status(404).json({ message: "No applicant details found for this event" })
    }
    return res.status(200).json(allAppliedUsers)
  } catch (err) {
    return res.status(401).json(err)
  }
}

exports.removeAnApplicantController = async (req, res) => {
  const eventId = req.params.id
  const { email } = req.body
  try {
    const allAppliedEvents = await appliedEvents.findOne({ eventId })
    if (!allAppliedEvents) {
      return res.status(404).json({ message: "Event application record not found" })
    }

    const initialLength = allAppliedEvents.registeredUser.length;
    allAppliedEvents.registeredUser = allAppliedEvents.registeredUser.filter((applicant) => applicant.email != email)

    if (allAppliedEvents.registeredUser.length === initialLength) {
      return res.status(404).json({ message: "Applicant email not found." })
    }
    
    await allAppliedEvents.save()
    return res.status(200).json(allAppliedEvents)
  } catch (err) {
    res.status(500).json(err)
  }
}