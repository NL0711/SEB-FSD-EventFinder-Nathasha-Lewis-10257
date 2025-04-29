"use client"

import { useEffect, useState, useContext } from "react"
import { Col, Row, Card, Spinner } from "react-bootstrap"
import EventCard from "../Event/EventCard"
import { getSavedEventDetailsAPI } from "../../services/allAPI"
import { SavedEventsContext } from "../../contexts/SavedEventsContext"

const SavedEvents = () => {
  const [savedEventsDetails, setSavedEventsDetails] = useState([])
  const [originalSavedEvents, setOriginalSavedEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { savedEventIds } = useContext(SavedEventsContext)

  useEffect(() => {
    fetchSavedEvents()
  }, [])

  useEffect(() => {
    if (originalSavedEvents.length > 0 && savedEventIds instanceof Set) {
      const filtered = originalSavedEvents.filter(event => savedEventIds.has(event?._id?.toString()))
      setSavedEventsDetails(filtered)
    } else if (!isLoading && originalSavedEvents.length > 0 && savedEventIds.size === 0) {
      setSavedEventsDetails([])
    }
  }, [savedEventIds, originalSavedEvents, isLoading])

  const fetchSavedEvents = async () => {
    setIsLoading(true)
    const token = sessionStorage.getItem("token")
    if (!token) {
      setSavedEventsDetails([])
      setOriginalSavedEvents([])
      return
    }

    const reqHeader = { Authorization: `Bearer ${token}` }

    try {
      const result = await getSavedEventDetailsAPI(reqHeader)
      if (result.status === 200 && Array.isArray(result.data)) {
        setSavedEventsDetails(result.data)
        setOriginalSavedEvents(result.data)
      } else {
        setSavedEventsDetails([])
        setOriginalSavedEvents([])
      }
    } catch (err) {
      console.error("Fetch saved events error:", err);
      setSavedEventsDetails([])
      setOriginalSavedEvents([])
    } finally {
      setIsLoading(false)
    }
  }

  const getEventImage = (event) => {
    if (event?.image) return event.image;
    return "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop"; 
  };

  return (
    <Row className="mt-3">
      {isLoading ? (
        <Col xs={12} className="text-center">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-2">Loading your saved events...</p>
        </Col>
      ) : savedEventsDetails.length > 0 ? (
        savedEventsDetails.map((event) => (
          <Col className="mb-3" sm={12} md={6} lg={4} key={event._id}>
            <EventCard 
              displayData={event} 
              insideSavedEvents={true}
              image={getEventImage(event)}
            />
          </Col>
        ))
      ) : (
        <Col xs={12}>
          <Card body className="text-center text-muted bg-light">
             You haven't saved any events yet. Browse events and click the bookmark icon to save!
          </Card>
        </Col>
      )}
    </Row>
  )
}

export default SavedEvents