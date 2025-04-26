"use client"

import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import EventCard from "./EventCard"
import { getAppliedEventsAPI, getEventDetailsAPI } from "../services/allAPI"

const AppliedEvents = () => {
  const [appliedEvents, setAppliedEvents] = useState([])
  const [appliedEventsDetails, setAppliedEventsDetails] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // console.log(appliedEvents);

  useEffect(() => {
    getUserEvents()
  }, [])

  useEffect(() => {
    if (appliedEvents?.length > 0) {
      getEventDetails()
    }
  }, [appliedEvents])

  const getUserEvents = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      }
      try {
        const result = await getAppliedEventsAPI(reqHeader)
        // console.log(result);

        if (result.status == 200) {
          setAppliedEvents(result.data)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const getEventDetails = async () => {
    // console.log("Inside getEventDetails");

    const token = sessionStorage.getItem("token")
    if (!token) return // Exit if no token is available

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    }

    try {
      // Fetch details for all saved event IDs
      const eventDetails = await Promise.all(
        appliedEvents?.map(async (event) => {
          try {
            // console.log("inside try");
            const result = await getEventDetailsAPI(event.eventId, reqHeader)
            if (result.status === 200) {
              // console.log(result);
              return result.data // Return event details
            }
          } catch (err) {
            console.error(`Error fetching details for event ID ${id}:`, err)
          }

          return null // Return null for failed requests
        }),
      )

      // Filter out null results and update state once
      const validEventDetails = eventDetails.filter((event) => event !== null)
      setAppliedEventsDetails(validEventDetails)
    } catch (err) {
      console.error("Error fetching event details:", err)
    }
  }
  return (
    <Row className="mt-3">
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : appliedEvents?.length > 0 && appliedEventsDetails?.length > 0 ? (
        appliedEventsDetails.map((event) => (
          <Col className="mb-3" sm={12} md={6} lg={4} key={event._id || event.id}>
            <EventCard displayData={event} insideAppliedEvents={true} />
          </Col>
        ))
      ) : (
        <div className="text-danger fw-bolder">You have not applied to any events yet!!!</div>
      )}
    </Row>
  )
}

export default AppliedEvents
