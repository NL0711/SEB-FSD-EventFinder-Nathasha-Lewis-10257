"use client"

import { useContext, useEffect, useState } from "react"
import { Row, Col, Container, Form, InputGroup, Button, Card } from "react-bootstrap"
import { getAllEventsAPI } from "../services/allAPI"
import { tokenAuthContext } from "../contexts/AuthContextAPI"
import EventCard from "../components/Event/EventCard"
import { useNavigate } from "react-router-dom"

function AllEvents() {
  const { isAuthorised } = useContext(tokenAuthContext)
  const [allEvents, setAllEvents] = useState([])
  const [featuredEvents, setFeaturedEvents] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const navigate = useNavigate()

  const getAllEvents = async () => {
    try {
       const token = sessionStorage.getItem("token");
       const reqHeader = token ? { Authorization: `Bearer ${token}` } : {};
       
        const result = await getAllEventsAPI(reqHeader);
        if (result.status === 200 && Array.isArray(result.data)) {
            const fetchedEvents = result.data || [];
            setAllEvents(fetchedEvents); 
            setFeaturedEvents(fetchedEvents.slice(0, 3));
        } else {
            setAllEvents([]); 
            setFeaturedEvents([]);
        }
    } catch (err) {
      setAllEvents([]); 
      setFeaturedEvents([]);
    }
  }

  useEffect(() => {
    getAllEvents()
  }, [])

  const eventTypes = ["All", ...new Set(allEvents.map(event => event.eventType).filter(Boolean))]; 

  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch = searchQuery === "" || 
      (event.eventName && event.eventName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (event.eventDescription && event.eventDescription.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === "All" || event.eventType === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  const getEventImage = (event) => {
    if (event?.image) {
        return event.image;
    }
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: "0px", paddingBottom: "50px" }}>
      <div 
        className="text-center text-white py-5 mb-5 shadow-sm"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '0 0 .25rem .25rem'
        }}
      >
        <Container>
           <h1 className="display-4 fw-bold">Discover Events</h1>
           <p className="lead">Find events that match your interests.</p>
        </Container>
      </div>

      <Container>
        <Row>
          <Col md={3}>
             <Card className="shadow-sm mb-4">
               <Card.Header className="bg-warning text-white">
                 <h5 className="mb-0">Featured Events</h5>
               </Card.Header>
               <Card.Body>
                 {featuredEvents.length > 0 ? (
                   featuredEvents.map(event => (
                     <div key={event._id} className="mb-3 pb-3 border-bottom" style={{cursor: 'pointer'}} onClick={() => handleEventClick(event._id)}>
                       <img src={getEventImage(event)} alt={event.eventName} className="img-fluid rounded mb-2" style={{height: '80px', width: '100%', objectFit: 'cover'}}/>
                       <p className="fw-bold small mb-1">{event.eventName}</p>
                       <p className="text-muted small mb-0">{new Date(event.startDate).toLocaleDateString()} | {event.eventType}</p>
                     </div>
                   ))
                 ) : (
                    <p className="text-muted text-center small">No featured events available.</p>
                 )}
               </Card.Body>
             </Card>
          </Col> 

          <Col md={6}> 
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
                  <Col md={6} className="mb-4" key={event._id}> 
                    <EventCard displayData={event} />
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

          <Col md={3}> 
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
        </Row>
      </Container>
    </div>
  )
}

export default AllEvents
