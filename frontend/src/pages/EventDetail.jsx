"use client"

import { useEffect, useState, useContext } from "react"
import { Row, Col, Container, Button, Card, Badge } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import { getEventDetailsAPI, getAllEventsAPI } from "../services/allAPI"
import { tokenAuthContext } from "../contexts/AuthContextAPI"
import { AppliedEventsContext } from "../contexts/AppliedEventsContext"
import { SavedEventsContext } from "../contexts/SavedEventsContext"
import EventActionButtons from "../components/Event/EventActionButtons"
import EventCard from "../components/Event/EventCard"

function EventDetail() {
  const { id } = useParams()
  const { isAuthorised } = useContext(tokenAuthContext)
  const { isLoadingStatus: isLoadingAppliedStatus } = useContext(AppliedEventsContext)
  const { isLoadingSavedStatus } = useContext(SavedEventsContext)
  const [event, setEvent] = useState(null)
  const [similarEvents, setSimilarEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const getEventImage = (ev) => {
    return ev?.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop";
  };

  const fetchEventAndSimilar = async () => {
    setLoading(true)
    setEvent(null)
    setSimilarEvents([])

    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = token ? { Authorization: `Bearer ${token}` } : {};

      const eventResult = await getEventDetailsAPI(id, reqHeader);
      if (eventResult.status !== 200) {
         console.error(`Failed to fetch event (Status: ${eventResult.status})`, eventResult.response?.data);
         throw new Error("Failed to fetch event");
      }
      const currentEventData = eventResult.data || null;
      setEvent(currentEventData);

      if (currentEventData && currentEventData.tags?.length > 0) {
        const currentEventTags = currentEventData.tags.map(tag => tag.trim().toLowerCase());
        const allEventsResult = await getAllEventsAPI(reqHeader); 
        
        if (allEventsResult.status === 200) {
            const potentialSimilarEvents = allEventsResult.data;
            const matchedEvents = potentialSimilarEvents
              .filter(item => 
                  item._id !== currentEventData._id &&
                  item.tags?.some(tag => currentEventTags.includes(tag.trim().toLowerCase()))
              )
              .slice(0, 3);
            setSimilarEvents(matchedEvents);
        }
      } 

    } catch (err) {
      setEvent(null); 
      setSimilarEvents([]); 
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEventAndSimilar(); 
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const isPageLoading = loading || isLoadingAppliedStatus || isLoadingSavedStatus;

  if (isPageLoading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading event details...</p>
      </div>
    );
  }
  
  if (!event) {
      return (
            <div className="text-center p-5">
              <h4>Event Not Found</h4>
              <p>The event details could not be loaded or the event does not exist.</p>
              <Button variant="primary" onClick={() => navigate('/all-events')} className="mt-3">
                View All Events
              </Button>
          </div>
      );
  }

  const { eventName, startDate, location, eventDescription, organizerName, tags } = event;

  return (
      <>
        <div 
          className="position-relative mb-4"
          style={{
            height: "400px",
            background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url(${getEventImage(event)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="position-absolute bottom-0 w-100 p-4">
            <Container>
              <h1 className="display-4 fw-bold text-white mb-3 shadow-sm">{eventName}</h1>
              <p className="lead text-white mb-0 shadow-sm">
                Date: {startDate ? new Date(startDate).toLocaleDateString() : "Date TBC"}
              </p>
            </Container>
          </div>
        </div>

        <Container className="my-5">
            <Row>
                <Col md={8}>
                    <Card className="shadow-sm mb-4">
                      <Card.Body>
                        {location && (
                          <div className="mb-3">
                            <h5 className="text-primary"><i className="fa-solid fa-location-dot me-2"></i>Location</h5>
                            <p>{location}</p>
                          </div>
                        )}
                        {eventDescription && (
                          <div className="mb-3">
                            <h5 className="text-primary"><i className="fa-solid fa-circle-info me-2"></i>Description</h5>
                            <p>{eventDescription}</p>
                          </div>
                        )}
                        {organizerName && (
                          <div className="mb-3">
                            <h5 className="text-primary"><i className="fa-solid fa-user-tie me-2"></i>Organizer</h5>
                            <p>{organizerName}</p>
                          </div>
                        )}
                        {tags && tags.length > 0 && (
                          <div>
                            <h5 className="text-primary mb-2"><i className="fa-solid fa-tags me-2"></i>Tags</h5>
                            <div>
                              {tags.map((tag, index) => (
                                <Badge pill bg="secondary" key={index} className="me-2 mb-2 fs-6">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </Card.Body>
                    </Card>

                    <EventActionButtons eventId={id} />
                </Col>
            </Row>

            {similarEvents && similarEvents.length > 0 && (
                <div className="mt-5 pt-5 border-top">
                <h3 className="mb-4 text-primary">Similar Events</h3>
                <Row>
                    {similarEvents.map(simEvent => (
                    <Col key={simEvent._id} md={4} className="mb-4">
                        <EventCard displayData={simEvent} />
                    </Col>
                    ))}
                </Row>
                </div>
            )}
        </Container>
      </>
  )
}

export default EventDetail