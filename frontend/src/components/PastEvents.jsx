import { Col, Row } from "react-bootstrap"
import { useState, useEffect } from "react"
import EventCard from "./EventCard"

const PastEvents = () => {
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sample data for past events
    const dummyPastEvents = [
      {
        _id: "past1",
        title: "Technology Conference 2023",
        category: "Tech",
        eventImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
        eventDate: "2023-05-15",
        eventVenue: "Tech Center, New York",
        overview: "A conference showcasing the latest technology trends and innovations."
      }
    ];

    // Simulate loading data
    setTimeout(() => {
      setPastEvents(dummyPastEvents);
      setLoading(false);
    }, 1000);

    // In a real app, you would fetch past events from your API:
    // const fetchPastEvents = async () => {
    //   try {
    //     const token = sessionStorage.getItem("token");
    //     const reqHeader = { Authorization: `Bearer ${token}` };
    //     const result = await getPastEventsAPI(reqHeader);
    //     setPastEvents(result.data);
    //   } catch (error) {
    //     console.error("Error fetching past events:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchPastEvents();

  }, []);

  if (loading) {
    return <div className="text-center p-5">Loading past events...</div>;
  }

  if (pastEvents.length === 0) {
    return (
      <div className="text-center p-5">
        <i className="fa-solid fa-calendar-xmark fa-3x text-muted mb-3"></i>
        <h4>No past events found</h4>
        <p className="text-muted">Events you've attended will appear here</p>
      </div>
    );
  }

  return (
    <Row className="mt-3">
      {pastEvents.map(event => (
        <Col className="mb-3" sm={12} md={6} lg={4} key={event._id}>
          <EventCard displayData={event} />
        </Col>
      ))}
    </Row>
  );
};

export default PastEvents;
