"use client"

import { useContext, useEffect, useState } from "react"
import { Container, Row, Col, Carousel, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { tokenAuthContext } from "../contexts/AuthContextAPI"
import { getAllEventsAPI } from "../services/allAPI"
import NoticeBoard from "../components/Home/NoticeBoard"
import FeaturedEvents from "../components/Home/FeaturedEvents"

const Home = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [uniqueEventTypes, setUniqueEventTypes] = useState([]);
  const [activeEventType, setActiveEventType] = useState("All");
  const [filteredFeaturedEvents, setFilteredFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [activeIndex, setActiveIndex] = useState(0)
  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    setIsAuthorised(!!token)
    fetchEventsAndCategories();
  }, [])

  const fetchEventsAndCategories = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = token ? { Authorization: `Bearer ${token}` } : {};
      
      const result = await getAllEventsAPI(reqHeader);
      if (result.status === 200 && Array.isArray(result.data)) {
        const fetchedEvents = result.data;
        setAllEvents(fetchedEvents);

        const eventTypesSet = new Set(fetchedEvents.map(event => event.eventType?.trim()).filter(Boolean));
        const sortedEventTypes = ["All", ...Array.from(eventTypesSet).sort((a, b) => a.localeCompare(b))];
        setUniqueEventTypes(sortedEventTypes);

      } else {
        setAllEvents([]);
        setUniqueEventTypes(["All"]);
      }
    } catch (err) {
      setAllEvents([]);
      setUniqueEventTypes(["All"]);
    } finally {
       setLoading(false);
    }
  }
  
  useEffect(() => {
    const eventsToFilter = activeEventType === "All" 
      ? allEvents 
      : allEvents.filter(event => event.eventType?.includes(activeEventType));
    setFilteredFeaturedEvents(eventsToFilter.slice(0, 5));
  }, [activeEventType, allEvents]);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex)
  }

  return (
    <>
      <Carousel activeIndex={activeIndex} onSelect={handleSelect} className="mb-4">
        {allEvents.slice(0, 5).map((event) => (
          <Carousel.Item key={event._id}>
            <div
              style={{
                height: "400px",
                background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop'})`,
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
      
      <Container className="mb-5">
        <Row>
          <Col md={3}>
            <NoticeBoard />

            <div className="bg-white text-primary p-3 shadow-sm border mb-4"> 
              <h5 className="border-bottom pb-2 text-primary">UPCOMING HACKATHONS</h5>
              <ul className="list-unstyled">
                <li className="py-2 border-bottom">
                  <a href="https://unstop.com/hackathons/hack-ai-thon-techfest-iit-bombay-indian-institute-of-technology-iit-bombay-mumbai-maharashtra-615291" 
                     target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary text-white rounded p-1 me-2 d-flex align-items-center justify-content-center" style={{width: "24px", height: "24px"}}>
                        <i className="fa-solid fa-code fa-sm"></i>
                      </div>
                      <div>
                        <strong>Hack-AI-Thon</strong>
                        <small className="d-block text-muted">TechFest IIT Bombay | May 25-28</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="py-2 border-bottom">
                  <a href="https://unstop.com/hackathons/picsart-ai-research-hackathon-pair-picsart-ai-research-634111" 
                     target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary text-white rounded p-1 me-2 d-flex align-items-center justify-content-center" style={{width: "24px", height: "24px"}}>
                        <i className="fa-solid fa-robot fa-sm"></i>
                      </div>
                      <div>
                        <strong>Picsart AI Research Hackathon</strong>
                        <small className="d-block text-muted">Picsart | June 5-12</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="py-2 border-bottom">
                  <a href="https://devfolio.co/hackathons" 
                     target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary text-white rounded p-1 me-2 d-flex align-items-center justify-content-center" style={{width: "24px", height: "24px"}}>
                        <i className="fa-solid fa-cube fa-sm"></i>
                      </div>
                      <div>
                        <strong>ETHIndia 2023</strong>
                        <small className="d-block text-muted">Ethereum Foundation | July 15-17</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="py-2">
                  <a href="https://devfolio.co/hackathons" 
                     target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none d-flex justify-content-center">
                    <div className="d-flex align-items-center">
                      <i className="fa-solid fa-arrow-right me-1"></i>
                      <span>View All Hackathons</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            
            <Card className="shadow-sm mt-4">
              <Card.Header className="bg-warning text-white">
                <h5 className="mb-0">PAST EVENTS</h5>
              </Card.Header>
              <Card.Body>
                <ul className="list-unstyled mb-0">
                  <li className="mb-3 pb-3 border-bottom">
                    <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaCUyMGV4cG98ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="Tech Expo Image" className="img-fluid rounded mb-2" style={{height: '80px', width: '100%', objectFit: 'cover'}} />
                    <p className="fw-bold small mb-1">Tech Expo 2023 Concluded</p>
                    <p className="text-muted small mb-0">01 Apr 2023</p>
                  </li>
                  <li className="mb-3 pb-3 border-bottom">
                    <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvZGluZyUyMGNoYWxsZW5nZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="Coding Challenge Image" className="img-fluid rounded mb-2" style={{height: '80px', width: '100%', objectFit: 'cover'}} />
                    <p className="fw-bold small mb-1">Annual Coding Challenge Winners Announced</p>
                    <p className="text-muted small mb-0">15 Mar 2023</p>
                  </li>
                  <li className="mb-3 pb-3">
                    <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Z3Vlc3QlMjBsZWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Guest Lecture Image" className="img-fluid rounded mb-2" style={{height: '80px', width: '100%', objectFit: 'cover'}} />
                    <p className="fw-bold small mb-1">Guest Lecture on AI Ethics Held</p>
                    <p className="text-muted small mb-0">20 Feb 2023</p>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          <Col md={9}>
            <div className="p-4 rounded shadow-sm mb-4">
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

            <FeaturedEvents 
              uniqueEventTypes={uniqueEventTypes}
              activeEventType={activeEventType}
              setActiveEventType={setActiveEventType}
              loading={loading}
              filteredFeaturedEvents={filteredFeaturedEvents}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home;