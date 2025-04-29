// import express
const express = require("express")
const userController = require("../Controllers/userController")
const eventController = require("../Controllers/eventController")
const appliedEventController = require("../Controllers/appliedEventController")
const savedEventController = require("../Controllers/savedEventController")
const jwtMiddleware = require("../Middlewares/jwtMiddleware")
const router = new express.Router()

// USER ROUTES
router.post("/login", userController.loginController)
router.get("/profile", jwtMiddleware, userController.getUserDetailsController)

// EVENT ROUTES
router.post("/add-events", jwtMiddleware, eventController.addEventController)
router.get("/home-events", eventController.getHomeEventsController)
router.get("/user-events", jwtMiddleware, eventController.getUserEventsController)
router.get("/event", eventController.getAllEventsController)
router.get("/event/:id", eventController.getEventDetailsController)
router.delete("/events/:id/remove", jwtMiddleware, eventController.deleteEventController)

router.post("/apply-event", jwtMiddleware, appliedEventController.applyEventController)
router.get("/apply-event/view", jwtMiddleware, appliedEventController.getUserAppliedEvents)
router.get("/apply-event/:id/details", jwtMiddleware, appliedEventController.getApplicationDetails)
router.post("/apply-event/:id/remove-applicant", jwtMiddleware, appliedEventController.removeAnApplicantController)

router.post("/saved-events", jwtMiddleware, savedEventController.saveEventController)
router.delete("/saved-events", jwtMiddleware, savedEventController.removeSavedEventController)
router.get("/saved-events/ids", jwtMiddleware, savedEventController.getUserSavedEventIdsController)
router.get("/saved-events/details", jwtMiddleware, savedEventController.getSavedEventDetailsController)

module.exports = router
