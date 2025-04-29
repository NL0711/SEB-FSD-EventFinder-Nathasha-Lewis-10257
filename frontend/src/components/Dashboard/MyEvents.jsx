"use client"

import { useContext, useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import EventCard from "../Event/EventCard"
import { getUserEventsAPI } from "../../services/allAPI"
import { isDeleteEventContext } from "../../contexts/ContextAPI"

const MyEvents = () => {
  const { isDeleteEvent } = useContext(isDeleteEventContext)
  const [userEvents, setUserEvents] = useState([])
  useEffect(() => {
    getUserEvents()
  }, [isDeleteEvent])

  const getUserEvents = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      }
      try {
        const result = await getUserEventsAPI(reqHeader)
        if (result.status == 200) {
          setUserEvents(result.data || [])
        } else {
          setUserEvents([]) 
        }
      } catch (err) {
        setUserEvents([]) 
      }
    }
  }
  return (
    <div style={{ position: "relative" }}>
      <Row className="mt-3">
        {userEvents?.length > 0 ? (
          userEvents.map((event) => (
            <Col key={event?._id} className="mb-3" sm={12} lg={4}>
              <EventCard displayData={event} insideMyEvents={true} />
            </Col>
          ))
        ) : (
          <Col><p className="text-muted">You haven't created any events yet.</p></Col>
        )}
      </Row>
    </div>
  )
}

export default MyEvents