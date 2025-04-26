"use client"

import { useEffect, useState, useContext } from "react"
import { Row, Col, Container, Card, Button, Badge, ListGroup } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import { getEventAPI, applyEventAPI, getAllEventsAPI } from "../services/allAPI"
import { tokenAuthContext } from "../contexts/AuthContextAPI"

function EventDetail() {
  const { id } = useParams()
  const { isAuthorised } = useContext(tokenAuthContext)
  const [event, setEvent] = useState({})
  const [similarEvents, setSimilarEvents] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()

  const getEventDetails = async () => {
    setLoading(true)
    setError("")
    
    // Handle demo events with numeric IDs
    if (!isNaN(parseInt(id)) && parseInt(id).toString() === id) {
      const demoId = parseInt(id);
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
          organizer: "Rotaract Club",
          eligibility: [
            "Open to all students of the college",
            "Participants must be at least 18 years old",
            "Participants must be in good physical health"
          ],
          registrationRequirements: [
            "Fill out the online registration form",
            "Submit a medical certificate (if required)"
          ]
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
          organizer: "GDSC (Google Developer Student Club)",
          eligibility: [
            "Open to all students of the college",
            "Participants must be in their second year or above",
            "Participants must have a strong background in programming and software development"
          ],
          registrationRequirements: [
            "Fill out the online registration form",
            "Submit a resume and a brief introduction (max 200 words)",
            "Submit a project idea proposal (max 2 pages)"
          ]
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
          organizer: "Rotaract Club",
          eligibility: [
            "Open to all students of the college",
            "Participants must be in their second year or above",
            "Participants must have a strong interest in sports and leadership"
          ],
          registrationRequirements: [
            "Fill out the online registration form",
            "Submit a resume and a brief introduction (max 200 words)"
          ]
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
          organizer: "STUCO (Student Council)",
          eligibility: [
            "Open to all students of the college",
            "Participants must be in their first year or above",
            "Participants must have a strong background in design and creativity"
          ],
          registrationRequirements: [
            "Fill out the online registration form",
            "Submit a portfolio of their work (max 5 pages)"
          ]
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
          organizer: "IEEE",
          eligibility: [
            "Open to all students of the college",
            "Participants must be in their second year or above",
            "Participants must have a strong background in engineering and technology"
          ],
          registrationRequirements: [
            "Fill out the online registration form",
            "Submit a project proposal (max 2 pages)"
          ]
        }
      ];
      
      const foundEvent = demoEvents.find(event => event._id === demoId);
      
      if (foundEvent) {
        setEvent(foundEvent);
        // Get similar events for demo events as well
        const otherDemoEvents = demoEvents.filter(event => event._id !== demoId)
                                         .slice(0, 3);
        setSimilarEvents(otherDemoEvents);
        setLoading(false);
        return;
      }
    }
  }

  const handleRegister = async () => {
    if (!sessionStorage.getItem("token")) {
      alert("Please login to register for this event");
      return;
    }
    
    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      
      // Get user data from session storage
      const userData = JSON.parse(sessionStorage.getItem("existingUser"));
      
      if (!userData || !userData._id) {
        alert("Your session information is incomplete. Please try logging in again.");
        return;
      }
      
      // Create request body with user information
      const reqBody = {
        eventId: id,
        registeredUser: {
          userId: userData._id,
          username: userData.username,
          email: userData.email
        }
      };
      
      const result = await applyEventAPI(reqBody, reqHeader);
      
      if (result.status === 200) {
        alert("Successfully registered for this event!");
      } else {
        alert(result.response?.data || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error registering for event:", error);
      alert("Failed to register for this event. Please try again later.");
    }
  };


  // Add a function to get the appropriate event image
  const getEventImage = (event) => {
    // For demo events (numeric IDs 1-5)
    const demoImages = {
      1: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1000&auto=format&fit=crop",
      2: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
      3: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000&auto=format&fit=crop",
      4: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
      5: "https://images.unsplash.com/photo-1581092921461-7031e4bfb83e?q=80&w=1000&auto=format&fit=crop",
    };
    
    // If this is a demo event with ID 1-5
    if (event._id >= 1 && event._id <= 5) {
      return demoImages[event._id];
    }
  };

  useEffect(() => {
    // Check if the user is an admin when component mounts
    const checkAdminStatus = () => {
      const userData = JSON.parse(sessionStorage.getItem("existingUser"));
      if (userData && userData.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };
    
    checkAdminStatus();
    getEventDetails();
  }, [id]);

  return (
    <div style={{ minHeight: "100vh", paddingTop: "120px", paddingBottom: "50px" }}>
      <Container fluid className="px-0">
        {error ? (
          <div className="text-center p-5">
            <div className="alert alert-danger">
              <h4>Error</h4>
              <p>{error}</p>
              <Button 
                variant="primary" 
                onClick={() => navigate('/all-events')} 
                className="mt-3"
              >
                View All Events
              </Button>
            </div>
          </div>
        ) : loading ? (
          <div className="text-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading event details...</p>
          </div>
        ) : event?.eventName ? (
          <>
            <div 
              className="position-relative"
              style={{
                height: "400px",
                background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url(${getEventImage(event)})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="position-absolute bottom-0 w-100 p-4">
                <Container>
                  <Row className="align-items-end">
                    <Col md={8}>
                      <h1 className="fw-bold text-white mb-2">{event.eventName}</h1>
                      <div className="d-flex flex-wrap mb-3">
                        <Badge bg="warning" className="me-2 mb-2">
                          {event.eventType}
                        </Badge>
                        <Badge bg="primary" className="me-2 mb-2">
                          {event.audienceType}
                        </Badge>
                      </div>
                      <div className="d-flex text-white mb-2">
                        <div className="me-4">
                          <i className="fa-solid fa-calendar-days me-2"></i>
                          {new Date(event.startDate).toLocaleDateString()}
                        </div>
                        <div className="me-4">
                          <i className="fa-solid fa-location-dot me-2"></i>
                          {event.location_city}
                        </div>
                        <div>
                          <i className="fa-solid fa-building me-2"></i>
                          {event.organizer}
                        </div>
                      </div>
                    </Col>
                    <Col md={4} className="text-end">
                      {isAdmin && (
                        <Button 
                          variant="warning" 
                          size="lg" 
                          className="fw-bold shadow me-2" 
                          onClick={() => navigate("/add-event")}
                        >
                          <i className="fa-solid fa-plus me-2"></i>
                          Add Event
                        </Button>
                      )}
                      {isAuthorised ? (
                        <Button 
                          variant="primary" 
                          size="lg" 
                          className="fw-bold shadow" 
                          onClick={handleRegister}
                        >
                          <i className="fa-solid fa-user-plus me-2"></i>
                          Register Now
                        </Button>
                      ) : (
                        <Button 
                          variant="primary" 
                          size="lg" 
                          className="fw-bold shadow" 
                          onClick={() => navigate("/login")}
                        >
                          <i className="fa-solid fa-right-to-bracket me-2"></i>
                          Login to Register
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>

            <Container className="my-5">
              <Row>
                <Col md={8}>
                  <Card className="border-0 shadow-sm mb-4">
                    <Card.Body>
                      <h4 className="mb-3">Event Details</h4>
                      <p className="lead">{event.eventDescription}</p>
                    
                      <Row className="mt-4">
                        <Col md={6} className="mb-3">
                          <div className="d-flex align-items-center">
                            <div className="bg-light p-2 rounded-circle me-3">
                              <i className="fa-solid fa-calendar-days text-primary"></i>
                            </div>
                            <div>
                              <p className="mb-0 fw-bold">Date</p>
                              <p className="mb-0">{new Date(event.startDate).toLocaleDateString()} to {new Date(event.endDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </Col>
                      
                        <Col md={6} className="mb-3">
                          <div className="d-flex align-items-center">
                            <div className="bg-light p-2 rounded-circle me-3">
                              <i className="fa-solid fa-clock text-primary"></i>
                            </div>
                            <div>
                              <p className="mb-0 fw-bold">Time</p>
                              <p className="mb-0">{event.startTime} - {event.endTime}</p>
                            </div>
                          </div>
                        </Col>
                      
                        <Col md={6} className="mb-3">
                          <div className="d-flex align-items-center">
                            <div className="bg-light p-2 rounded-circle me-3">
                              <i className="fa-solid fa-location-dot text-primary"></i>
                            </div>
                            <div>
                              <p className="mb-0 fw-bold">Location</p>
                              <p className="mb-0">{event.location_city}, {event.location_state}</p>
                            </div>
                          </div>
                        </Col>
                      
                        <Col md={6} className="mb-3">
                          <div className="d-flex align-items-center">
                            <div className="bg-light p-2 rounded-circle me-3">
                              <i className="fa-solid fa-building text-primary"></i>
                            </div>
                            <div>
                              <p className="mb-0 fw-bold">Organizer</p>
                              <p className="mb-0">{event.organizer || "Event Organizer"}</p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    
                      {event.eventWebsite && (
                        <a href={event.eventWebsite} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary mt-3">
                          <i className="fa-solid fa-globe me-2"></i>
                          Visit Event Website
                        </a>
                      )}
                    </Card.Body>
                  </Card>
                  
                  {event.tags && (
                    <div className="mb-4">
                      <h5 className="mb-3">Tags</h5>
                      <div>
                        {event.tags.split(",").map((tag, index) => (
                          <Badge key={index} bg="secondary" className="me-2 mb-2 p-2">
                            {tag.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <Card className="shadow-sm border-0 mb-4">
                    <Card.Body>
                      <h4 className="mb-4">About the Organizer</h4>
                      <div>
                        <div className="bg-light p-3 rounded-circle d-inline-flex mb-3">
                          <i className="fa-solid fa-users fa-2x text-primary"></i>
                        </div>
                        <h5 className="mb-3">{event.organizer}</h5>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={4}>
                  <Card className="shadow-sm border-0 mb-4">
                    <Card.Body>
                      <h4 className="text-center mb-4">Registration Details</h4>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="d-flex justify-content-between align-items-center border-bottom py-2">
                          <span>Status</span>
                          <Badge bg="success">Open</Badge>
                        </ListGroup.Item>
                      </ListGroup>
                      
                      {/* Eligibility Criteria */}
                      {event.eligibility && (
                        <div className="mt-4">
                          <h5 className="fw-bold mb-3">Eligibility Criteria</h5>
                          <ul className="list-unstyled">
                            {event.eligibility.map((item, index) => (
                              <li key={index} className="mb-2 d-flex">
                                <i className="fa-solid fa-check text-success me-2 mt-1"></i>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Registration Requirements */}
                      {event.registrationRequirements && (
                        <div className="mt-4">
                          <h5 className="fw-bold mb-3">Registration Requirements</h5>
                          <ul className="list-unstyled">
                            {event.registrationRequirements.map((item, index) => (
                              <li key={index} className="mb-2 d-flex">
                                <i className="fa-solid fa-file-lines text-primary me-2 mt-1"></i>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                   </Card.Body>
                  </Card>  
                </Col>
              </Row>

              <h3 className="fw-bold mb-4">Similar Events</h3>
              <Row>
                {similarEvents.map((item) => (
                  <Col md={4} key={item._id} className="mb-4">
                    <Card className="h-100 shadow-sm hover-shadow">
                      <Card.Img
                        variant="top"
                        src={getEventImage(item)}
                        alt={item.eventName}
                        style={{height: "160px", objectFit: "cover"}}
                      />
                      <Card.Body>
                        <Card.Title className="fw-bold">{item.eventName}</Card.Title>
                        <Card.Text className="text-muted small mb-2">
                          <i className="fa-solid fa-calendar-days me-2"></i>
                          {new Date(item.startDate).toLocaleDateString()}
                        </Card.Text>
                        <Card.Text className="text-primary small mb-3">
                          <i className="fa-solid fa-building me-2"></i>
                          {item.organizer || "Event Organizer"}
                        </Card.Text>
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="w-100" 
                          onClick={() => navigate(`/event/${item._id}`)}
                        >
                          View Details
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </>
        ) : (
          <div className="text-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading event details...</p>
          </div>
        )}
      </Container>
    </div>
  )
}

export default EventDetail
