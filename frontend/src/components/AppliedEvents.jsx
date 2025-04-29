"use client"

import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import EventCard from "./EventCard"
import { getAppliedEventsAPI, getEventDetailsAPI } from "../services/allAPI"

// Add demoEvents data here (same as in AllEvents.jsx/Home.jsx)
const demoEvents = [
  {
    _id: 1,
    eventName: "Heart and Sole Run 7",
    eventDescription: "Annual charity marathon supporting heart health awareness and research.",
    // ... other fields for event 1 ...
    eventType: "Sports",
    tags: "marathon, charity, health",
    organizer: "Rotaract Club",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1000&auto=format&fit=crop"
  },
  {
    _id: 2,
    eventName: "Bit and Build",
    eventDescription: "Hackathon and coding competition for innovative software solutions.",
    // ... other fields for event 2 ...
    eventType: "Technology",
    tags: "hackathon, coding, tech",
    organizer: "GDSC (Google Developer Student Club)",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    _id: 3,
    eventName: "Athlead",
    eventDescription: "Sports leadership summit featuring renowned athletes and coaches.",
    // ... other fields for event 3 ...
    eventType: "Conference",
    tags: "sports, leadership, networking",
    organizer: "Rotaract Club",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000&auto=format&fit=crop"
  },
  {
    _id: 4,
    eventName: "CRMD",
    eventDescription: "Creative Media Design exhibition showcasing student projects.",
    // ... other fields for event 4 ...
    eventType: "Exhibition",
    tags: "design, art, student",
    organizer: "STUCO (Student Council)",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    _id: 5,
    eventName: "Prakalp",
    eventDescription: "Project competition for hardware and software innovations with prizes.",
    // ... other fields for event 5 ...
    eventType: "Competition",
    tags: "innovation, projects, technology",
    organizer: "IEEE",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop"
  },
];

const AppliedEvents = () => {
  const [appliedEvents, setAppliedEvents] = useState([])
  const [appliedEventsDetails, setAppliedEventsDetails] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // console.log(appliedEvents);

  useEffect(() => {
    getUserAppliedEventsList() // Renamed for clarity
  }, [])

  useEffect(() => {
    if (appliedEvents?.length > 0) {
      getAppliedEventDetails() // Renamed and modified
    }
  }, [appliedEvents])

  const getUserAppliedEventsList = async () => { // Renamed
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

  const getAppliedEventDetails = async () => { // Renamed and modified
    const token = sessionStorage.getItem("token")
    if (!token) return

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    }

    try {
      const eventDetailsPromises = appliedEvents.map(async (eventRef) => {
        const id = eventRef.eventId;
        // Check if it's a numeric ID (demo event)
        if (!isNaN(parseInt(id)) && parseInt(id).toString() === id.toString()) {
            const demoId = parseInt(id);
            const foundDemo = demoEvents.find(demo => demo._id === demoId);
            if(foundDemo) return foundDemo; // Return local demo data
            else {
              console.warn(`Applied event with numeric ID ${id} not found in local demoEvents array.`);
              return null;
            } 
        } else {
          // Otherwise, fetch details from API for real events
          try {
            const result = await getEventDetailsAPI(id, reqHeader)
            if (result.status === 200) {
              return result.data
            }
          } catch (err) {
            console.error(`Error fetching details for event ID ${id}:`, err)
          }
          return null // Return null for failed API requests
        }
      })
      
      const eventDetails = await Promise.all(eventDetailsPromises);

      // Filter out null results and update state once
      const validEventDetails = eventDetails.filter((event) => event !== null)
      setAppliedEventsDetails(validEventDetails)
    } catch (err) {
      console.error("Error processing applied event details:", err)
    }
  }

  // Function to get image (needed if EventCard doesn't get it)
  const getEventImage = (event) => {
    // Check if it's a demo event first
    const demo = demoEvents.find(d => d._id === event._id);
    if (demo && demo.image) return demo.image;
    
    // Fallback logic for real events (similar to AllEvents.jsx)
    const typeImages = {
      "Sports": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop",
      "Technology": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
      "Conference": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop",
      "Exhibition": "https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?q=80&w=1000&auto=format&fit=crop",
      "Competition": "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
    };
    return typeImages[event.eventType] || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop";
  };

  return (
    <Row className="mt-3">
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : appliedEventsDetails.length > 0 ? (
        appliedEventsDetails.map((event) => (
          <Col className="mb-3" sm={12} md={6} lg={4} key={event._id}>
            {/* Pass image prop to EventCard */}
            <EventCard displayData={event} insideAppliedEvents={true} image={getEventImage(event)}/>
          </Col>
        ))
      ) : (
        <div className="text-danger fw-bolder">You have not applied to any events yet!!!</div>
      )}
    </Row>
  )
}

export default AppliedEvents
