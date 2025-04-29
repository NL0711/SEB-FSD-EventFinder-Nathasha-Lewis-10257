import { Card, Button, Badge } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Register from "./Register"
import { useContext } from 'react';
import { AppliedEventsContext } from '../contexts/AppliedEventsContext';

function EventCard({ displayData = {}, image, insideMyEvents = false, insideSavedEvents = false }) {
  const { appliedEventIds, isLoadingStatus } = useContext(AppliedEventsContext);

  const isApplied = appliedEventIds.has(displayData?._id?.toString());
  
  console.log(`[EventCard] Rendering card for: ${displayData.eventName || 'N/A'}. ID: ${displayData?._id}, Is Applied (from context)?: ${isApplied}`);

  const navigate = useNavigate();

  if (!displayData || Object.keys(displayData).length === 0) {
    return (
      <Card className="event-card shadow-sm h-100" style={{ width: "18rem" }}>
        <Card.Body className="d-flex justify-content-center align-items-center">
          <div className="text-center text-muted">
            <i className="fa-solid fa-calendar-xmark fa-3x mb-3"></i>
            <p>No event data available</p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  const handleViewDetails = () => {
    if (displayData._id) {
      navigate(`/event/${displayData._id}`);
    } else {
      console.error("No event ID available for navigation");
    }
  };

  const formatDate = (start, end) => {
    const startDate = start ? new Date(start).toLocaleDateString() : null;
    const endDate = end ? new Date(end).toLocaleDateString() : null;
    if (startDate && endDate && startDate !== endDate) {
      return `${startDate} - ${endDate}`;
    } else if (startDate) {
      return startDate;
    }
    return "Date not specified";
  }

  return (
    <Card className="event-card shadow-sm h-100">
      <div
        style={{
          height: "140px",
          background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${image || displayData.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0 fs-5">{displayData.eventName || "Untitled Event"}</Card.Title>
          <Badge bg="warning" text="dark" className="rounded-pill">
            {displayData.eventType || "Uncategorized"}
          </Badge>
        </div>
        <Card.Text className="small text-muted mb-2">
          <i className="fa-solid fa-calendar-days me-2"></i>
          {formatDate(displayData.startDate, displayData.endDate)}
        </Card.Text>
        <Card.Text className="small text-muted mb-2">
          <i className="fa-solid fa-location-dot me-2"></i>
          {displayData.location_city || displayData.location_state || "Venue not specified"}
        </Card.Text>
        <Card.Text className="small mb-3">
          {displayData.eventDescription ? `${displayData.eventDescription.slice(0, 100)}...` : "No description available"}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="bg-white border-0 pt-0">
         <div className="d-flex gap-2">
          <Button variant="outline-primary" className="w-50" onClick={handleViewDetails}>
            Details
          </Button>
          {isLoadingStatus ? (
             <Button variant="secondary" disabled className="w-50">
                Loading...
             </Button>
           ) : isApplied ? (
             <Button variant="success" disabled className="w-50">
                 <i className="fa-solid fa-check me-1"></i> Applied
              </Button>
           ) : (
            <Register 
              eventId={displayData._id} 
              eventTitle={displayData.eventName || "Event"} 
              className="w-50" 
            />
           )}
        </div>
      </Card.Footer>
    </Card>
  )
}

export default EventCard
