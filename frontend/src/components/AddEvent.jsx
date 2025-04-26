"use client"

import { useContext, useEffect, useState } from "react"
import { Button, Form, InputGroup, Modal } from "react-bootstrap"
import { addEventsAPI, editEventAPI } from "../services/allAPI"
import { useLocation, useParams } from "react-router-dom"
import { isModifyEventContext } from "../contexts/ContextAPI"

const AddEvent = ({ displayData }) => {
  const { setIsModifyEvent } = useContext(isModifyEventContext)
  const [show, setShow] = useState(false)
  const location = useLocation()
  const { id } = useParams()

  const isEventDetailPage = location.pathname.includes("/event")

  const handleClose = () => {
    setShow(false)
  }

  useEffect(() => {
    if (isEventDetailPage && displayData) {
      // Prepopulate form fields with the data of the existing event for modification
      setEventData({
        eventName: displayData.eventName || "",
        eventDescription: displayData.eventDescription || "",
        eventWebsite: displayData.eventWebsite || "",
        startDate: displayData.startDate ? displayData.startDate.substring(0, 10) : "",
        endDate: displayData.endDate ? displayData.endDate.substring(0, 10) : "",
        startTime: displayData.startTime || "",
        endTime: displayData.endTime || "",
        location_city: displayData.location_city || "",
        location_state: displayData.location_state || "",
        audienceType: displayData.audienceType || "General",
        eventType: displayData.eventType || "",
        organizer: displayData.organizer || "",
      })

      // Set checkbox states based on existing data
      setIsOneDayEvent(displayData.startDate === displayData.endDate)
    } else {
      // Initialize empty values for new event creation
      setEventData({
        eventName: "",
        eventDescription: "",
        eventWebsite: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        location_city: "",
        location_state: "",
        audienceType: "General",
        eventType: "",
        organizer: "",
      })

      setIsOneDayEvent(false)
    }
  }, [show, isEventDetailPage, displayData])

  const handleShow = () => {
    setShow(true)
  }

  const [isOneDayEvent, setIsOneDayEvent] = useState(false)

  const handleOneDayEventChange = (e) => {
    setIsOneDayEvent(e.target.checked)
    if (e.target.checked && eventData.startDate) {
      setEventData(prev => ({
        ...prev,
        endDate: prev.startDate
      }));
    }
  }

  const [eventData, setEventData] = useState({
    eventName: "",
    eventDescription: "",
    eventWebsite: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location_city: "",
    location_state: "",
    audienceType: "General",
    eventType: "",
    organizer: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEventData((prev) => ({ ...prev, [name]: value }))
    
    // Auto-update end date if one-day event is checked
    if (name === "startDate" && isOneDayEvent) {
      setEventData(prev => ({
        ...prev,
        endDate: value
      }));
    }
  }

  const handleRegister = async () => {
    const {
      eventName,
      eventDescription,
      startDate,
      endDate,
      startTime,
      endTime,
      location_city,
      location_state,
      audienceType,
      eventType,
      organizer,
    } = eventData

    // Check if start date is on or after the current date
    const currentDate = new Date().toISOString().split("T")[0] // Get current date in 'yyyy-mm-dd' format
    if (new Date(startDate) < new Date(currentDate)) {
      alert("Start date must be today or a future date.")
      return
    }

    // Check if end date is after start date (if not one-day event)
    if (!isOneDayEvent && new Date(endDate) <= new Date(startDate)) {
      alert("End date must be after the start date.")
      return
    }

    // Check for required fields
    if (
      !eventName ||
      !eventDescription ||
      !startDate ||
      !endDate ||
      !startTime ||
      !endTime ||
      !location_city ||
      !location_state ||
      !audienceType ||
      !eventType ||
      !organizer
    ) {
      alert("Please fill in all required fields.")
      return
    } else {
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeaders = {
          Authorization: `Bearer ${token}`,
        }
        try {
          const result = await addEventsAPI(eventData, reqHeaders)
          if (result.status == 200) {
            alert("Event added successfully!")
            setShow(false) // Close the modal
            window.location.reload(); // Refresh the page to show the new event
          } else {
            alert(result.response?.data || "Failed to add event")
          }
        } catch (err) {
          console.error("Error adding event:", err)
          alert("An error occurred while adding the event")
        }
      } else {
        alert("You must be logged in to add events")
      }
    }
  }

  const handleUpdate = async () => {
    const {
      eventName,
      eventDescription,
      startDate,
      endDate,
      startTime,
      endTime,
      location_city,
      location_state,
      audienceType,
      eventType,
      organizer,
    } = eventData

    // Check if end date is after start date (if not one-day event)
    if (!isOneDayEvent && new Date(endDate) <= new Date(startDate)) {
      alert("End date must be after the start date.")
      return
    }

    // Check for required fields
    if (
      !eventName ||
      !eventDescription ||
      !startDate ||
      !endDate ||
      !startTime ||
      !endTime ||
      !location_city ||
      !location_state ||
      !audienceType ||
      !eventType ||
      !organizer
    ) {
      alert("Please fill in all required fields.")
      return
    } else {
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeaders = {
          Authorization: `Bearer ${token}`,
        }
        try {
          const result = await editEventAPI(id, eventData, reqHeaders)
          if (result.status == 200) {
            alert("Event updated successfully!")
            setIsModifyEvent(result.data)
            setShow(false) // Close the modal
            window.location.reload(); // Refresh the page to show updated event
          } else {
            alert(result.response?.data || "Failed to update event")
          }
        } catch (err) {
          console.error("Error updating event:", err)
          alert("An error occurred while updating the event")
        }
      } else {
        alert("You must be logged in to update events")
      }
    }
  }

  function formatDateForDisplay(inputDate) {
    const date = new Date(inputDate)
    const day = String(date.getDate()).padStart(2, "0") // Add leading zero if necessary
    const month = String(date.getMonth() + 1).padStart(2, "0") // Months are 0-indexed
    const year = String(date.getFullYear()).slice(-2) // Get the last two digits of the year
    return `${day}/${month}/${year}`
  }

  return (
    <>
      {isEventDetailPage ? (
        <button
          onClick={handleShow}
          style={{ position: "absolute", right: "1rem" }}
          className="btn btn-warning rounded-pill px-4 border-2 fw-bold me-5"
        >
          Modify Event
        </button>
      ) : (
        <button
          onClick={handleShow}
          style={{ position: "absolute", right: "1rem", zIndex: "10" }}
          className="btn btn-warning rounded-pill px-4 border-2 fw-bold"
        >
          Add New Event
        </button>
      )}

      {/* Event Form Modal */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} dialogClassName="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-primary fw-semibold">
            {isEventDetailPage ? "Update Event Details" : "Add Event Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Event Name */}
            <Form.Group className="mb-3" controlId="formEventName">
              <Form.Label className="text-primary fw-bold">Event Name *</Form.Label>
              <Form.Control
                placeholder="Enter event name"
                name="eventName"
                value={eventData.eventName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Event description */}
            <Form.Group className="mb-3" controlId="formEventDescription">
              <Form.Label className="text-primary fw-bold">Event Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter details about the event"
                name="eventDescription"
                value={eventData.eventDescription}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Event Website */}
            <Form.Group className="mb-3" controlId="formEventWebsite">
              <Form.Label className="text-primary fw-bold">Event Website (optional)</Form.Label>
              <Form.Control
                placeholder="Enter website URL"
                name="eventWebsite"
                value={eventData.eventWebsite}
                onChange={handleInputChange}
              />
            </Form.Group>

            <div className="row">
              {/* Event Dates */}
              <Form.Group className="mb-3 col-md-6" controlId="formEventDates">
                <Form.Check
                  type="switch"
                  label="One-day event"
                  checked={isOneDayEvent}
                  onChange={handleOneDayEventChange}
                  className="mb-2"
                />
                
                <Form.Label className="text-primary fw-bold">Start Date *</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={eventData.startDate}
                  onChange={handleInputChange}
                  required
                  className="mb-2"
                />
                
                <Form.Label className="text-primary fw-bold">End Date *</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={eventData.endDate}
                  onChange={handleInputChange}
                  disabled={isOneDayEvent}
                  required
                />
              </Form.Group>

              {/* Event Times */}
              <Form.Group className="mb-3 col-md-6" controlId="formEventTimes">
                <Form.Label className="text-primary fw-bold">Start Time *</Form.Label>
                <Form.Control
                  type="time"
                  name="startTime"
                  value={eventData.startTime}
                  onChange={handleInputChange}
                  required
                  className="mb-2"
                />
                
                <Form.Label className="text-primary fw-bold">End Time *</Form.Label>
                <Form.Control
                  type="time"
                  name="endTime"
                  value={eventData.endTime}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>

            <div className="row">
              {/* Location */}
              <Form.Group className="mb-3 col-md-6" controlId="formLocation">
                <Form.Label className="text-primary fw-bold">Location *</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="City"
                    name="location_city"
                    value={eventData.location_city}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Control
                    placeholder="State"
                    name="location_state"
                    value={eventData.location_state}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
              </Form.Group>

              {/* Event Type and Audience */}
              <Form.Group className="mb-3 col-md-6" controlId="formEventTypeAudience">
                <Form.Label className="text-primary fw-bold">Event Type *</Form.Label>
                <Form.Select 
                  name="eventType"
                  value={eventData.eventType}
                  onChange={handleInputChange}
                  required
                  className="mb-2"
                >
                  <option value="">Select Event Type</option>
                  <option value="Sports">Sports</option>
                  <option value="Technology">Technology</option>
                  <option value="Conference">Conference</option>
                  <option value="Exhibition">Exhibition</option>
                  <option value="Competition">Competition</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Other">Other</option>
                </Form.Select>
                
                <Form.Label className="text-primary fw-bold">Audience Type *</Form.Label>
                <Form.Select
                  name="audienceType"
                  value={eventData.audienceType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="General">General</option>
                  <option value="Students">Students</option>
                  <option value="Professional">Professional</option>
                  <option value="All Ages">All Ages</option>
                </Form.Select>
              </Form.Group>
            </div>
            
            {/* Organizer */}
            <Form.Group className="mb-3" controlId="formOrganizer">
              <Form.Label className="text-primary fw-bold">Organizer *</Form.Label>
              <Form.Control
                placeholder="Enter organizing club or committee name"
                name="organizer"
                value={eventData.organizer}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          {isEventDetailPage ? (
            <Button variant="success" onClick={handleUpdate}>
              Update Event
            </Button>
          ) : (
            <Button variant="success" onClick={handleRegister}>
              Add Event
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddEvent
