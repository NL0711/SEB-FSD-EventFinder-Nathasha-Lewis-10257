"use client"

import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import EventCard from "../Event/EventCard"
import { getAppliedEventsAPI, getEventDetailsAPI } from "../../services/allAPI"

const AppliedEvents = () => {
  const [appliedEvents, setAppliedEvents] = useState([])
  const [appliedEventsDetails, setAppliedEventsDetails] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getUserAppliedEventsList()
  }, [])

  useEffect(() => {
    if (appliedEvents.length > 0) { 
      getAppliedEventDetails()
    } else {
      setIsLoading(false) 
    }
  }, [appliedEvents])

  const getUserAppliedEventsList = async () => {
    setIsLoading(true) 
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      }
      try {
        const result = await getAppliedEventsAPI(reqHeader)
        if (result.status == 200) {
          setAppliedEvents(result.data || []) 
        } else {
          setAppliedEvents([]) 
        }
      } catch (err) {
        setAppliedEvents([])
      } 
    } else {
      setAppliedEvents([])
      setIsLoading(false) 
    }
  }

  const getAppliedEventDetails = async () => {
    const token = sessionStorage.getItem("token")
    if (!token || appliedEvents.length === 0) {
      setAppliedEventsDetails([])
      setIsLoading(false)
      return
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    }

    try {
      const eventDetailsPromises = appliedEvents
        .map(eventRef => eventRef?.eventId)
        .filter(Boolean) 
        .map(id => getEventDetailsAPI(id, reqHeader));
      
      const results = await Promise.allSettled(eventDetailsPromises);
      
      const validEventDetails = results
        .filter(result => result.status === 'fulfilled' && result.value.status === 200)
        .map(result => result.value.data);

      setAppliedEventsDetails(validEventDetails);
    } catch (err) {
      setAppliedEventsDetails([])
    } finally {
      setIsLoading(false)
    }
  }

  const getEventImage = (event) => {
    return event?.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop";
  };

  return (
    <Row className="mt-3">
      {isLoading && <div className="text-center w-100">Loading...</div>}
      {!isLoading && appliedEventsDetails.length === 0 && (
        <div className="text-muted fw-bolder w-100">You have not applied to any events yet.</div>
      )}
      {!isLoading && appliedEventsDetails.length > 0 && (
        appliedEventsDetails.map((event) => (
          <Col className="mb-3" sm={12} md={6} lg={4} key={event?._id}> 
            <EventCard displayData={event} insideAppliedEvents={true} image={getEventImage(event)}/>
          </Col>
        ))
      )}
    </Row>
  )
}

export default AppliedEvents