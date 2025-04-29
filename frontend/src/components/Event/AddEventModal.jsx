"use client"

import { useEffect, useState } from "react"
import { Button, Form, Modal, InputGroup, Badge } from "react-bootstrap"
import { addEventsAPI } from "../../services/allAPI"
import EventFormFields from "./EventFormFields"

const AddEventModal = ({ show, handleClose }) => {

  const [isOneDayEvent, setIsOneDayEvent] = useState(false)
  const [eventData, setEventData] = useState({
    eventName: "", eventDescription: "", eventWebsite: "", image: "",
    startDate: "", endDate: "", startTime: "", endTime: "",
    location_city: "", location_state: "", audienceType: "General",
    eventType: "Conference", organizer: "", tags: [], maxRegistrations: "",
    eligibility: "", registrationRequirements: ""
  })
  const [currentTagInput, setCurrentTagInput] = useState("");

  const resetForm = () => {
    setEventData({
      eventName: "", eventDescription: "", eventWebsite: "", image: "",
      startDate: "", endDate: "", startTime: "", endTime: "",
      location_city: "", location_state: "", audienceType: "General",
      eventType: "Conference", organizer: "", tags: [], maxRegistrations: "",
      eligibility: "", registrationRequirements: ""
    });
    setIsOneDayEvent(false);
    setCurrentTagInput("");
  };

  useEffect(() => {
    if (show) {
      resetForm();
    }
  }, [show])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEventData((prev) => ({ ...prev, [name]: value }))
    
    if (name === "startDate" && isOneDayEvent) {
      setEventData(prev => ({
        ...prev,
        endDate: value
      }));
    }
  }

  const handleOneDayEventChange = (e) => {
    setIsOneDayEvent(e.target.checked)
    if (e.target.checked && eventData.startDate) {
      setEventData(prev => ({
        ...prev,
        endDate: prev.startDate
      }));
    }
  }

  const handleAddTag = () => {
    const newTag = currentTagInput.trim();
    if (newTag && !eventData.tags.includes(newTag)) {
      setEventData(prev => ({ ...prev, tags: [...prev.tags, newTag] }))
      setCurrentTagInput("");
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setEventData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }))
  }

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const validateAndPrepareData = () => {
    const { 
      eventName, eventDescription, startDate, endDate, startTime, endTime,
      location_city, location_state, audienceType, eventType, organizer,
      maxRegistrations, eligibility, registrationRequirements
    } = eventData

    if (!eventName || !eventDescription || !startDate || !endDate || !startTime || !endTime ||
        !location_city || !location_state || !audienceType || !eventType || !organizer) {
      alert("Please fill in all required fields.");
      return null;
    }

    const currentDate = new Date().toISOString().split("T")[0];
    if (new Date(startDate) < new Date(currentDate)) {
      alert("Start date must be today or a future date.");
      return null;
    }

    if (!isOneDayEvent && new Date(endDate) <= new Date(startDate)) {
      alert("End date must be after the start date.");
      return null;
    }

    const reqBody = {
      ...eventData,
      maxRegistrations: maxRegistrations ? parseInt(maxRegistrations, 10) : null,
      eligibility: eligibility.split('\n').filter(line => line.trim() !== ''),
      registrationRequirements: registrationRequirements.split('\n').filter(line => line.trim() !== ''),
    }
    return reqBody;
  }

  const handleAddEvent = async () => {
    const reqBody = validateAndPrepareData();
    if (!reqBody) return;

    const token = sessionStorage.getItem("token");
    if (!token) {
      return;
    }

    const reqHeaders = { Authorization: `Bearer ${token}` };
    try {
      const result = await addEventsAPI(reqBody, reqHeaders);
      if (result.status == 200) {
        alert("Event added successfully!");
        handleClose();
      } else {
        alert(result.response?.data || "Failed to add event.");
      }
    } catch (err) {
    }
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <EventFormFields 
            eventData={eventData}
            handleInputChange={handleInputChange}
            isOneDayEvent={isOneDayEvent}
            handleOneDayEventChange={handleOneDayEventChange}
          />
          <Form.Group className="mb-3">
            <Form.Label>Tags (Optional)</Form.Label>
            <InputGroup>
              <Form.Control 
                type="text" 
                value={currentTagInput} 
                onChange={(e) => setCurrentTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                placeholder="Add a tag and press Enter or Add"
              />
              <Button variant="outline-secondary" onClick={handleAddTag}>Add Tag</Button>
            </InputGroup>
            <div className="mt-2">
              {eventData.tags.map(tag => (
                <Badge 
                  pill 
                  bg="primary" 
                  key={tag} 
                  className="me-2 mb-2 fs-6 user-select-none" 
                  onClick={() => handleRemoveTag(tag)} 
                  style={{ cursor: 'pointer' }}
                  title={`Click to remove "${tag}"`}
                >
                  {tag} <span aria-hidden="true">&times;</span>
                </Badge>
              ))}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAddEvent}>
          Add Event
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddEventModal; 