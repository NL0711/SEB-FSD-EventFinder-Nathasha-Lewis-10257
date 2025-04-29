const appliedEvents = require("../Models/appliedEventsModel")

// register to applied events
exports.applyEventController = async (req, res) => {
  console.log("Inside applyEventController")
  const { eventId, registeredUser } = req.body
  console.log("Received eventId:", eventId, registeredUser)
  try {
    const existingEvent = await appliedEvents.findOne({ eventId })
    if (existingEvent) {
      const alreadyApplied = existingEvent.registeredUser.some(
        (user) => user.userId === registeredUser.userId && user.username === registeredUser.username,
      )

      if (alreadyApplied) {
        console.log("User has already applied.")
        return res.status(406).json("You have already applied for this event")
      }

      console.log("existing but not applied")
      existingEvent.registeredUser.push(registeredUser)
      await existingEvent.save()
      return res.status(200).json(existingEvent)
    } else {
      console.log("new")
      const newRegistration = new appliedEvents({ eventId, registeredUser: [registeredUser] })
      await newRegistration.save()
      res.status(200).json(newRegistration)
    }
  } catch (err) {
    console.log(err)
    res.status(401).json(err)
  }
}

// get applied events
exports.getUserAppliedEvents = async (req, res) => {
  try {
    console.log("Inside getUserAppliedEvents Controller")

    // Use email from token for lookup
    const userEmail = req.userEmail 
    console.log("User Email from token:", userEmail)

    // Find events where the user's email exists in the `registeredUser` array
    const events = await appliedEvents.find(
      { "registeredUser.email": userEmail }, // Match user's email inside `registeredUser`
      { eventId: 1, _id: 0 }, // Return only eventId, exclude _id
    )

    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No applied events found for this user" })
    }

    return res.status(200).json(events)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error", error })
  }
}

// get all applicant details
exports.getApplicationDetails = async (req, res) => {
  console.log("Inside getApplicationDetails Controller")

  const eventId = req.params.id
  console.log(eventId)

  try {
    const allAppliedUsers = await appliedEvents.findOne({ eventId: eventId })
    if (!allAppliedUsers || allAppliedUsers.registeredUser.length === 0) {
      console.log("no users")

      return res.status(404).json({ message: "No applicant details found for this event" })
    }
    return res.status(200).json(allAppliedUsers)
  } catch (err) {
    console.log(err)
    return res.status(401).json(err)
  }
}

// check if applied or not by current user
exports.checkApplyStatusController = async (req, res) => {
  console.log("Inside checkApplyStatusController")
  const id = req.params.id // Event ID
  // Use email from token (attached by jwtMiddleware)
  const userEmail = req.userEmail 
  
  if (!userEmail) {
      console.error("Email not found in request (check jwtMiddleware)");
      return res.status(401).json("Authorization Error: User email missing.");
  }

  try {
    console.log(`Checking status for event: ${id}, user email: ${userEmail}`);
    const existingEvent = await appliedEvents.findOne({ eventId: id })
    if (existingEvent) {
      // Check if any user in the array matches the TOKEN's email
      const alreadyApplied = existingEvent.registeredUser.some((user) => user.email === userEmail);

      if (alreadyApplied) {
        console.log(`User ${userEmail} has already applied for event ${id}.`);
        return res.status(200).json("You have already applied for this event")
      } else {
         console.log(`User ${userEmail} has NOT applied for event ${id} (event found, user not in list).`);
         // Return 406 to indicate event exists but user hasn't applied
         return res.status(406).json("You have not applied for this event yet") 
      }
    } else {
      console.log(`No application record found for event ${id}.`);
      res.status(404).json("Event application record not found") // Event application record doesn't exist
    }
  } catch (err) {
    console.log(err)
    res.status(500).json("Internal Server Error while checking status.") // Use 500 for server errors
  }
}

// unapply event by id
exports.cancelRegistrationController = async (req, res) => {
  console.log("Inside cancelRegistrationController")
  const userId = req.userId
  // console.log(userId);
  const id = req.params.id
  // console.log(id);

  try {
    // console.log("inside try");

    const existingEvent = await appliedEvents.findOne({ eventId: id })
    console.log(existingEvent)

    if (!existingEvent) {
      // console.log("no event existing");

      return res.status(404).json({ message: "No applied events found for this user" })
    }
    if (existingEvent.registeredUser.some((user) => user.userId === userId)) {
      // console.log(" user existing");

      existingEvent.registeredUser = existingEvent.registeredUser.filter(
        (user) => user.userId.toString() !== userId.toString(),
      )
    } else {
      // console.log("no user existing");
      return res.status(404).json({ message: "Event not found in applied events" })
    }
    await existingEvent.save()
    return res.status(200).json(existingEvent)
  } catch (err) {
    console.log(err)
    return res.status(401).json(err)
  }
}

exports.removeAnApplicantController = async (req, res) => {
  console.log("Inside removeAnApplicantController")
  const eventId = req.params.id
  const { email } = req.body
  try {
    const allAppliedEvents = await appliedEvents.findOne({ eventId })
    if (!allAppliedEvents) {
      return res.status(404).json({ message: "No saved events found for this user" })
    }
    if (allAppliedEvents.registeredUser.includes(email)) {
      allAppliedEvents.registeredUser = allAppliedEvents.registeredUser.filter((applicant) => applicant.email != email)
    } else {
      return res.status(404).json({ message: "Applicant not found." })
    }
    await allAppliedEvents.save()
    return res.status(200).json(allAppliedEvents)
  } catch (err) {
    console.log(err)
    return res.status(401).json(err)
  }
}
