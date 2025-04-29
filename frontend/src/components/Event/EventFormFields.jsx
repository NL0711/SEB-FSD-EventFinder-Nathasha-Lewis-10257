import React from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';

const EventFormFields = ({ eventData, handleInputChange, isOneDayEvent, handleOneDayEventChange }) => {
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
    audienceType,
    eventType,
    organizer,
    maxRegistrations,
    eligibility,
    registrationRequirements
  } = eventData;

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Event Name*</Form.Label>
        <Form.Control type="text" name="eventName" value={eventName} onChange={handleInputChange} placeholder="Enter event name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Event Description*</Form.Label>
        <Form.Control as="textarea" rows={3} name="eventDescription" value={eventDescription} onChange={handleInputChange} placeholder="Describe the event" />
      </Form.Group>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Event Website</Form.Label>
            <Form.Control type="url" name="eventWebsite" value={eventWebsite} onChange={handleInputChange} placeholder="https://example.com" />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" name="image" value={image} onChange={handleInputChange} placeholder="Image URL" />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
          <Col md={6}>
              <Form.Group>
                  <Form.Label>Start Date*</Form.Label>
                  <Form.Control type="date" name="startDate" value={startDate} onChange={handleInputChange} />
              </Form.Group>
          </Col>
          <Col md={6}>
              <Form.Group>
                  <Form.Label>End Date*</Form.Label>
                  <Form.Control type="date" name="endDate" value={endDate} onChange={handleInputChange} disabled={isOneDayEvent} />
              </Form.Group>
          </Col>
          <Col xs={12} className="mt-2">
              <Form.Check 
                  type="checkbox" 
                  label="This is a one-day event" 
                  checked={isOneDayEvent} 
                  onChange={handleOneDayEventChange} 
              />
          </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Start Time*</Form.Label>
            <Form.Control type="time" name="startTime" value={startTime} onChange={handleInputChange} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>End Time*</Form.Label>
            <Form.Control type="time" name="endTime" value={endTime} onChange={handleInputChange} />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Location City*</Form.Label>
            <Form.Control type="text" name="location_city" value={location_city} onChange={handleInputChange} placeholder="City" />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Location State/Province*</Form.Label>
            <Form.Control type="text" name="location_state" value={location_state} onChange={handleInputChange} placeholder="State/Province" />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Audience Type*</Form.Label>
            <Form.Select name="audienceType" value={audienceType} onChange={handleInputChange}>
              <option>General</option>
              <option>Students</option>
              <option>Professionals</option>
              <option>Developers</option>
              <option>Designers</option>
              <option>Entrepreneurs</option>
              <option>Families</option>
              <option>Specific Group</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Event Type*</Form.Label>
            <Form.Select name="eventType" value={eventType} onChange={handleInputChange}>
              <option>Conference</option>
              <option>Workshop</option>
              <option>Meetup</option>
              <option>Hackathon</option>
              <option>Webinar</option>
              <option>Social Gathering</option>
              <option>Competition</option>
              <option>Exhibition</option>
              <option>Festival</option>
              <option>Other</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Organizer*</Form.Label>
        <Form.Control type="text" name="organizer" value={organizer} onChange={handleInputChange} placeholder="Organizer name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Max Registrations (Optional)</Form.Label>
        <Form.Control type="number" name="maxRegistrations" value={maxRegistrations} onChange={handleInputChange} placeholder="Leave blank for unlimited" min="1" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Eligibility Criteria (Optional, one per line)</Form.Label>
        <Form.Control as="textarea" rows={3} name="eligibility" value={eligibility} onChange={handleInputChange} placeholder="e.g., Must be 18+\nMust be a student" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Registration Requirements (Optional, one per line)</Form.Label>
        <Form.Control as="textarea" rows={3} name="registrationRequirements" value={registrationRequirements} onChange={handleInputChange} placeholder="e.g., Photo ID required\nProof of enrollment" />
      </Form.Group>
    </>
  );
};

export default EventFormFields; 