// import express
const express = require("express")
const userController = require("../Controllers/userController")
const eventController = require("../Controllers/eventController")
const appliedEventController = require("../Controllers/appliedEventController")
const savedEventsController = require("../Controllers/savedEventsController")
const pastEventsController = require("../Controllers/pastEventsController")
const jwtMiddleware = require("../Middlewares/jwtMiddleware")
// const multerMiddleware = require('../Middlewares/multerMiddleware')

const router = new express.Router()

// /register
router.post("/register", userController.registerController)

// /login
router.post("/login", userController.loginController)

// /profile - getuserDetails
router.get("/profile", jwtMiddleware, userController.getUserDetailsController)

// /get user details by id
router.get("/user-details/:id", jwtMiddleware, userController.getUserDetailsByIdController)

// add-event
router.post("/add-events", jwtMiddleware, eventController.addEventController)

// edit-event
router.put("/events/:id/edit", jwtMiddleware, eventController.editEventsController)

// get home events
router.get("/home-events", eventController.getHomeEventsController)

// get all events
router.get("/all-events", jwtMiddleware, eventController.getAllEventsController)
router.get("/event", eventController.getAllEventsController)

// get user events
router.get("/user-events", jwtMiddleware, eventController.getUserEventsController)

// check apply status of event
router.get("/event/:id/status", jwtMiddleware, appliedEventController.checkApplyStatusController)

// get event by id - new format
router.get("/event/:id", eventController.getEventDetailsController)

// get applied events by user
router.get("/apply-event/view", jwtMiddleware, appliedEventController.getUserAppliedEvents)

// get applicant details for events
router.get("/apply-event/:id/details", jwtMiddleware, appliedEventController.getApplicationDetails)

// get event by id - old format, keep for backward compatibility
router.get("/:id/event", eventController.getEventDetailsController)

// remove event by id /:id/remove
router.delete("/:id/remove", jwtMiddleware, eventController.removeEventController)

// save event
router.post("/save-event", jwtMiddleware, savedEventsController.saveEventController)

// get saved Events
router.post("/save-event/view", jwtMiddleware, savedEventsController.getSavedEventsController)

// delete saved events
router.post("/remove-saved-event", jwtMiddleware, savedEventsController.deleteSavedEventsByIdController)

// delete all saved events
router.delete("/remove-all-saved-events", jwtMiddleware, savedEventsController.deleteAllSavedEventsController)

// apply for event
router.post("/apply-event", jwtMiddleware, appliedEventController.applyEventController)

// cancel registration/unapply event
router.post("/apply-event/:id/remove", jwtMiddleware, appliedEventController.cancelRegistrationController)

// delete applicant
router.post("/apply-event/:id/remove", jwtMiddleware, appliedEventController.removeAnApplicantController)

module.exports = router
