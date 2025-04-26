"use client"

import { useContext, useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import EventCard from "./EventCard"
import { getEventDetailsAPI, getSavedEventAPI } from "../services/allAPI"
import { isSavedEventDeletedContext } from "../contexts/ContextAPI"

const SavedEvents = () => {
  const { isSavedEventDeleted, setIsSavedEventDeleted } = useContext(isSavedEventDeletedContext)
  const [savedEventDetails, setSavedEventsDetails] = useState([])
  const [savedEvents, setSavedEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    getUserSavedEvents()
  }, [isSavedEventDeleted])

  useEffect(() => {
    if (savedEvents?.savedEvents?.length > 0) {
      getEventDetails()
    }
  }, [savedEvents])

  const getUserSavedEvents = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      }
      try {
        const result = await getSavedEventAPI(reqHeader)
        // console.log(result);

        if (result.status === 200 && result.data?.savedEvents?.length > 0) {
          setSavedEvents(result.data)
        } else {
          setSavedEvents({ savedEvents: [] }) // Clear events if none exist
        }
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const getEventDetails = async () => {
    const token = sessionStorage.getItem("token")
    if (!token) return // Exit if no token is available

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    }

    try {
      // Fetch details for all saved event IDs
      const eventDetails = await Promise.all(
        savedEvents.savedEvents.map(async (id) => {
          try {
            const result = await getEventDetailsAPI(id, reqHeader)
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
      setSavedEventsDetails(validEventDetails)
    } catch (err) {
      console.error("Error fetching event details:", err)
    }
  }

  return (
    <Row className="mt-3">
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : savedEvents?.savedEvents?.length > 0 && savedEventDetails?.length > 0 ? (
        savedEventDetails.map((event) => (
          <Col className="mb-3" sm={12} md={6} lg={4} key={event._id || event.id}>
            <EventCard displayData={event} insideSavedEvents={true} />
          </Col>
        ))
      ) : (
        <div className="text-center">You have not saved any event yet!!!</div>
      )}
    </Row>
  )
}

export default SavedEvents
