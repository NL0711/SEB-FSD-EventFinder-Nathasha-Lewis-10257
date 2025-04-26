"use client"

import { useContext, useEffect, useState } from "react"
import { Card, Container, Row, Col, Button, Carousel } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { tokenAuthContext } from "../contexts/AuthContextAPI"
import { getHomeEventsAPI } from "../services/allAPI"
import Register from "../components/Register"

const Home = () => {
  const [homeEvents, setHomeEvents] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    setIsAuthorised(!!token)
    getHomeProjects()
  }, [])

  const getHomeProjects = async () => {
    try {
      // Get token if available
      const token = sessionStorage.getItem("token");
      const reqHeader = token ? { Authorization: `Bearer ${token}` } : {};
      
      const result = await getHomeEventsAPI(reqHeader);
      if (result.status === 200) {
        setHomeEvents(result.data);
      }
    } catch (err) {
      console.error("Error fetching home events:", err);
    }
  }

  // Featured events data
  const featuredEvents = [
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
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1000&auto=format&fit=crop",
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
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
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
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000&auto=format&fit=crop",
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
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
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
      image: "https://images.unsplash.com/photo-1581092921461-7031e4bfb83e?q=80&w=1000&auto=format&fit=crop",
      organizer: "IEEE"
    },
  ]

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex)
  }

  const handleViewDetails = (eventId) => {
    // Treat all events (including demo ones) as real events
    navigate(`/event/${eventId}`);
  };

  return (
    <>
      {/* Carousel Section */}
      <Carousel activeIndex={activeIndex} onSelect={handleSelect} className="mb-4">
        {featuredEvents.map((event, idx) => (
          <Carousel.Item key={idx}>
            <div
              style={{
                height: "400px",
                background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${event.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Container className="h-100 d-flex flex-column justify-content-center align-items-center text-white">
                <h1 className="display-4 fw-bold">{event.eventName}</h1>
                <p className="lead mb-4">{event.eventDescription}</p>
                <p className="mb-4">Date: {new Date(event.startDate).toLocaleDateString()}</p>
              </Container>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Quick Links Section */}
      <Container className="mb-5">
        <Row>
          <Col md={3}>
            <div className="bg-warning text-dark p-3 mb-4">
              <h5 className="border-bottom pb-2">NOTICE BOARD</h5>
              <ul className="list-unstyled">
                <li className="py-2 border-bottom">
                  <small className="d-block text-muted">04 May 2023</small>
                  Registration open for Heart and Sole Run 7
                </li>
                <li className="py-2 border-bottom">
                  <small className="d-block text-muted">10 May 2023</small>
                  Bit and Build hackathon schedule announced
                </li>
                <li className="py-2">
                  <small className="d-block text-muted">15 May 2023</small>
                  Athlead speaker lineup confirmed
                </li>
              </ul>
            </div>
            
            <div className="bg-primary text-white p-3">
              <h5 className="border-bottom pb-2">UPCOMING HACKATHONS</h5>
              <ul className="list-unstyled">
                <li className="py-2 border-bottom">
                  <a href="https://unstop.com/hackathons/hack-ai-thon-techfest-iit-bombay-indian-institute-of-technology-iit-bombay-mumbai-maharashtra-615291" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="text-white text-decoration-none">
                    <div className="d-flex align-items-center">
                      <div className="bg-white text-primary rounded p-1 me-2 d-flex align-items-center justify-content-center" style={{width: "24px", height: "24px"}}>
                        <i className="fa-solid fa-code fa-sm"></i>
                      </div>
                      <div>
                        <strong>Hack-AI-Thon</strong>
                        <small className="d-block">TechFest IIT Bombay | May 25-28</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="py-2 border-bottom">
                  <a href="https://unstop.com/hackathons/picsart-ai-research-hackathon-pair-picsart-ai-research-634111" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="text-white text-decoration-none">
                    <div className="d-flex align-items-center">
                      <div className="bg-white text-primary rounded p-1 me-2 d-flex align-items-center justify-content-center" style={{width: "24px", height: "24px"}}>
                        <i className="fa-solid fa-robot fa-sm"></i>
                      </div>
                      <div>
                        <strong>Picsart AI Research Hackathon</strong>
                        <small className="d-block">Picsart | June 5-12</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="py-2 border-bottom">
                  <a href="https://devfolio.co/hackathons" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="text-white text-decoration-none">
                    <div className="d-flex align-items-center">
                      <div className="bg-white text-primary rounded p-1 me-2 d-flex align-items-center justify-content-center" style={{width: "24px", height: "24px"}}>
                        <i className="fa-solid fa-cube fa-sm"></i>
                      </div>
                      <div>
                        <strong>ETHIndia 2023</strong>
                        <small className="d-block">Ethereum Foundation | July 15-17</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="py-2">
                  <a href="https://devfolio.co/hackathons" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="text-white text-decoration-none d-flex justify-content-center">
                    <div className="d-flex align-items-center">
                      <i className="fa-solid fa-arrow-right me-1"></i>
                      <span>View All Hackathons</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </Col>

          <Col md={9}>
            <div className="bg-light p-4 rounded shadow-sm mb-4">
              <Row className="align-items-center">
                <Col lg={7}>
                  <h2 className="text-primary mb-4">Welcome to EventFinder</h2>
                  <p className="lead mb-4">
                    Your one-stop platform for discovering, tracking, and participating in exciting events.
                  </p>
                  {isAuthorised ? (
                    <Link to={"/dashboard"} className="btn btn-warning rounded-pill px-4">
                      CONTINUE TO EXPLORE
                    </Link>
                  ) : (
                    <Link to={"/login"} className="btn btn-warning rounded-pill px-4">
                      START TO EXPLORE
                    </Link>
                  )}
                </Col>
                <Col lg={5} className="text-center">
                  <img
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop"
                    alt="Event Planning"
                    className="img-fluid rounded shadow-sm"
                    style={{ maxHeight: "300px" }}
                  />
                </Col>
              </Row>
            </div>

            {/* Featured Events Grid */}
            <h3 className="text-center mb-4">Featured Events</h3>
            <Row>
              {featuredEvents.map((event, idx) => (
                <Col md={4} key={idx} className="mb-4">
                  <Card className="h-100 shadow-sm hover-shadow">
                    <div
                      style={{
                        height: "120px",
                        background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${event.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <Card.Body>
                      <Card.Title className="fw-bold">{event.eventName}</Card.Title>
                      <Card.Text className="small text-muted mb-2">
                        {new Date(event.startDate).toLocaleDateString()}
                      </Card.Text>
                      <Card.Text className="small mb-2">{event.eventDescription}</Card.Text>
                      <Card.Text className="small text-primary">
                        <strong>By:</strong> {event.organizer}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-white border-0 d-flex gap-2">
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="w-50" 
                        onClick={() => handleViewDetails(event._id)}
                      >
                        Details
                      </Button>
                      <Register 
                        eventId={event._id} 
                        eventTitle={event.eventName} 
                        size="sm"
                        className="w-50" 
                      />
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home
