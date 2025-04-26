"use client"

import { useContext, useEffect, useState } from "react"
import { Row, Col, Container, Form, InputGroup, Button, Card } from "react-bootstrap"
import { getAllEventsAPI } from "../services/allAPI"
import { tokenAuthContext } from "../contexts/AuthContextAPI"
import EventCard from "../components/EventCard"
import { useNavigate } from "react-router-dom"

function AllEvents() {
  const { isAuthorised } = useContext(tokenAuthContext)
  const [allEvents, setAllEvents] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const navigate = useNavigate()

  // Demo events - these will always be shown
  const demoEvents = [
    {
      _id: 1,
      eventName: "Heart and Sole Run 7",
      eventDescription: "Annual charity marathon supporting heart health awareness and research.",
      eventWebsite: "https://heartandsolerun.org",
      startDate: "2023-05-15",
      endDate: "2023-05-15",
      startTime: "07:00 AM",
      endTime: "11:00 AM",
      location_city: "CRCE",
      location_state: "Bandra West",
      audienceType: "All Ages",
      eventType: "Sports",
      tags: "marathon, charity, health",
      userId: "admin123",
      organizer: "Rotaract Club"
    },
    {
      _id: 2,
      eventName: "Bit and Build",
      eventDescription: "Hackathon and coding competition for innovative software solutions.",
      eventWebsite: "https://bitandbuild.tech",
      startDate: "2023-06-10",
      endDate: "2023-06-12",
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      location_city: "CRCE",
      location_state: "Bandra West",
      audienceType: "Professional",
      eventType: "Technology",
      tags: "hackathon, coding, tech",
      userId: "admin123",
      organizer: "GDSC (Google Developer Student Club)"
    },
    {
      _id: 3,
      eventName: "Athlead",
      eventDescription: "Sports leadership summit featuring renowned athletes and coaches.",
      eventWebsite: "https://athlead-summit.com",
      startDate: "2023-07-22",
      endDate: "2023-07-23",
      startTime: "10:00 AM",
      endTime: "06:00 PM",
      location_city: "CRCE",
      location_state: "Bandra West",
      audienceType: "Professional",
      eventType: "Conference",
      tags: "sports, leadership, networking",
      userId: "admin123",
      organizer: "Rotaract Club"
    },
    {
      _id: 4,
      eventName: "CRMD",
      eventDescription: "Creative Media Design exhibition showcasing student projects.",
      eventWebsite: "https://crmd-exhibition.edu",
      startDate: "2023-08-05",
      endDate: "2023-08-07",
      startTime: "09:00 AM",
      endTime: "08:00 PM",
      location_city: "CRCE",
      location_state: "Bandra West",
      audienceType: "Students",
      eventType: "Exhibition",
      tags: "design, art, student",
      userId: "admin123",
      organizer: "STUCO (Student Council)"
    },
    {
      _id: 5,
      eventName: "Prakalp",
      eventDescription: "Project competition for hardware and software innovations with prizes.",
      eventWebsite: "https://prakalp-competition.org",
      startDate: "2023-09-19",
      endDate: "2023-09-20",
      startTime: "10:00 AM",
      endTime: "04:00 PM",
      location_city: "CRCE",
      location_state: "Bandra West",
      audienceType: "Students",
      eventType: "Competition",
      tags: "innovation, projects, technology",
      userId: "admin123",
      organizer: "IEEE"
    }
  ];

  const getAllEvents = async () => {
    try {
      if (sessionStorage.getItem("token")) {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        }
        const result = await getAllEventsAPI(reqHeader)
        if (result.status === 200) {
          // Combine demo events with real events
          const combinedEvents = [...demoEvents, ...result.data];
          setAllEvents(combinedEvents);
        } else {
          // If API fails, use demo events
          setAllEvents(demoEvents);
        }
      } else {
        // If not logged in, show demo events
        setAllEvents(demoEvents);
      }
    } catch (err) {
      console.error("Error:", err);
      // On error, use demo events
      setAllEvents(demoEvents);
    }
  }

  useEffect(() => {
    getAllEvents()
  }, [])

  // Get unique categories
  const eventTypes = ["All", ...new Set(allEvents.map(event => event.eventType).filter(Boolean))];

  // Filter events based on search and category
  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch = searchQuery === "" || 
      (event.eventName && event.eventName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (event.eventDescription && event.eventDescription.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === "All" || event.eventType === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Handle event click
  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  // Get event image based on ID or type
  const getEventImage = (event) => {
    const imageMap = {
      1: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1000&auto=format&fit=crop",
      2: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
      3: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000&auto=format&fit=crop",
      4: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
      5: "https://images.unsplash.com/photo-1581092921461-7031e4bfb83e?q=80&w=1000&auto=format&fit=crop",
    };
    
    // For demo events, use the fixed image
    if (event._id >= 1 && event._id <= 5) {
      return imageMap[event._id];
    }
    
    // For other events, use a image based on event type or a default
    const typeImages = {
      "Sports": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop",
      "Technology": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
      "Conference": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop",
      "Exhibition": "https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?q=80&w=1000&auto=format&fit=crop",
      "Competition": "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
    };
    
    return typeImages[event.eventType] || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop";
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: "120px", paddingBottom: "50px" }}>
      <Container>
        <div className="mb-5">
          <h2 className="text-center mb-4">Discover Events</h2>
        </div>

        <Row>
          <Col md={3}>
            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-warning">
                <h5 className="mb-0">Featured Events</h5>
              </Card.Header>
              <Card.Body>
                <ul className="list-unstyled">
                  {demoEvents.map(event => (
                    <li key={event._id} className="mb-3 pb-3 border-bottom" 
                        style={{cursor: "pointer"}}
                        onClick={() => handleEventClick(event._id)}>
                      <h6 className="mb-1">{event.eventName}</h6>
                      <small className="text-muted d-block">
                        {new Date(event.startDate).toLocaleDateString()}
                      </small>
                      <small className="text-primary">
                        By: {event.organizer}
                      </small>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>

            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Filter by Category</h5>
              </Card.Header>
              <Card.Body>
                <Form>
                  {eventTypes.map(type => (
                    <Form.Check
                      key={type}
                      type="radio"
                      id={`category-${type}`}
                      label={type}
                      name="category"
                      checked={categoryFilter === type}
                      onChange={() => setCategoryFilter(type)}
                      className="mb-2"
                    />
                  ))}
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md={9}>
            <div className="mb-4">
              <InputGroup>
                <Form.Control
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="primary">
                  <i className="fa-solid fa-search"></i>
                </Button>
              </InputGroup>
            </div>

            {filteredEvents.length > 0 ? (
              <Row>
                {filteredEvents.map((event) => (
                  <Col md={4} className="mb-4" key={event._id}>
                    <Card className="h-100 shadow-sm hover-shadow">
                      <div
                        style={{
                          height: "120px",
                          background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${getEventImage(event)})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      <Card.Body>
                        <Card.Title className="fw-bold">{event.eventName}</Card.Title>
                        <Card.Text className="small text-muted mb-2">
                          {new Date(event.startDate).toLocaleDateString()} | {event.eventType}
                        </Card.Text>
                        <Card.Text className="small mb-2">
                          {event.eventDescription && event.eventDescription.length > 80
                            ? `${event.eventDescription.substring(0, 80)}...`
                            : event.eventDescription}
                        </Card.Text>
                        <Card.Text className="small text-primary">
                          <strong>By:</strong> {event.organizer || "Event Organizer"}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className="bg-white border-0">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          className="w-100" 
                          onClick={() => handleEventClick(event._id)}
                        >
                          View Details
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="text-center p-5 bg-light rounded">
                <i className="fa-solid fa-calendar-xmark fa-3x text-muted mb-3"></i>
                <h4>No events found</h4>
                <p className="text-muted">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AllEvents
