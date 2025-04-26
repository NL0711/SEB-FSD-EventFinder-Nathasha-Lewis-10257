import { Card, Button, Badge } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Register from "./Register"

function EventCard({ displayData = {} }) {
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

  return (
    <Card className="event-card shadow-sm h-100" style={{ width: "18rem" }}>
      <div
        style={{
          height: "140px",
          background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${displayData.eventImage || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0 fs-5">{displayData.title || "Untitled Event"}</Card.Title>
          <Badge bg="warning" text="dark" className="rounded-pill">
            {displayData.category || "Uncategorized"}
          </Badge>
        </div>
        <Card.Text className="small text-muted mb-2">
          <i className="fa-solid fa-calendar-days me-2"></i>
          {displayData.eventDate ? new Date(displayData.eventDate).toLocaleDateString() : "Date not specified"}
        </Card.Text>
        <Card.Text className="small text-muted mb-2">
          <i className="fa-solid fa-location-dot me-2"></i>
          {displayData.eventVenue || "Venue not specified"}
        </Card.Text>
        <Card.Text className="small mb-3">
          {displayData.overview ? `${displayData.overview.slice(0, 100)}...` : "No description available"}
        </Card.Text>
        <div className="d-flex gap-2">
          <Button variant="outline-primary" className="w-50" onClick={handleViewDetails}>
            Details
          </Button>
          <Register 
            eventId={displayData._id} 
            eventTitle={displayData.title || "Event"} 
            className="w-50" 
          />
        </div>
      </Card.Body>
    </Card>
  )
}

export default EventCard
