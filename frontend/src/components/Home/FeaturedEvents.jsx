import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import EventCard from '../Event/EventCard';

const FeaturedEvents = ({
  uniqueEventTypes,
  activeEventType,
  setActiveEventType,
  filteredFeaturedEvents,
}) => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Featured Events</h2>

      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        {uniqueEventTypes.map(type => (
          <Button
            key={type}
            variant={activeEventType === type ? "primary" : "outline-secondary"}
            className={`shadow-sm rounded-pill px-3 ${activeEventType !== type ? 'text-dark' : ''}`}
            onClick={() => setActiveEventType(type)}
            size="sm"
          >
            {type}
          </Button>
        ))}
      </div>

      {filteredFeaturedEvents.length > 0 ? (
        <Row>
          {filteredFeaturedEvents.map((event) => (
            <Col md={4} className="mb-4" key={event._id}>
              <EventCard displayData={event} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center text-muted">No events found matching the selected type.</div>
      )}
      <div className="text-center mt-4">
      </div>
    </Container>
  );
};

export default FeaturedEvents; 