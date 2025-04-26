"use client"

import { useEffect, useState } from "react"
import { Row, Col, Container, Nav, Tab, Card, Badge } from "react-bootstrap"
import Profile from "../components/Profile"
import MyEvents from "../components/MyEvents"
import AddEvent from "../components/AddEvent"
import SavedEvents from "../components/SavedEvents"
import AppliedEvents from "../components/AppliedEvents"
import PastEvents from "../components/PastEvents"

function Dashboard() {
  const [username, setUsername] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setUsername(user.username)
    }
  }, [])

  return (
    <div style={{ minHeight: "100vh", paddingTop: "120px", paddingBottom: "50px" }}>
      <Container>
        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center">
                  <div className="me-4">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/219/219988.png"
                      alt="Profile"
                      className="rounded-circle border"
                      width="80"
                      height="80"
                    />
                  </div>
                  <div>
                    <h2 className="mb-1">Welcome, {username}</h2>
                    <p className="text-muted mb-0">Manage your events and profile from your personal dashboard</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Tab.Container id="dashboard-tabs" defaultActiveKey="profile">
          <Row>
            <Col md={3} className="mb-4">
              <Card className="shadow-sm">
                <Card.Header className="bg-primary text-white">
                  <h5 className="mb-0">Dashboard</h5>
                </Card.Header>
                <Card.Body className="p-0">
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="profile" className="rounded-0 border-bottom px-4 py-3">
                        <i className="fa-solid fa-user me-2"></i> Profile
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="myEvents" className="rounded-0 border-bottom px-4 py-3">
                        <i className="fa-solid fa-calendar-check me-2"></i> My Events
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="addEvent" className="rounded-0 border-bottom px-4 py-3">
                        <i className="fa-solid fa-plus me-2"></i> Add Event
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="savedEvents" className="rounded-0 border-bottom px-4 py-3">
                        <i className="fa-solid fa-bookmark me-2"></i> Saved Events
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="appliedEvents" className="rounded-0 border-bottom px-4 py-3">
                        <i className="fa-solid fa-clipboard-check me-2"></i> Applied Events
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="pastEvents" className="rounded-0 px-4 py-3">
                        <i className="fa-solid fa-history me-2"></i> Past Events
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Body>
              </Card>
            </Col>

            <Col md={9}>
              <Card className="shadow-sm">
                <Tab.Content>
                  <Tab.Pane eventKey="profile">
                    <Profile />
                  </Tab.Pane>
                  <Tab.Pane eventKey="myEvents">
                    <MyEvents />
                  </Tab.Pane>
                  <Tab.Pane eventKey="addEvent">
                    <AddEvent />
                  </Tab.Pane>
                  <Tab.Pane eventKey="savedEvents">
                    <SavedEvents />
                  </Tab.Pane>
                  <Tab.Pane eventKey="appliedEvents">
                    <AppliedEvents />
                  </Tab.Pane>
                  <Tab.Pane eventKey="pastEvents">
                    <PastEvents />
                  </Tab.Pane>
                </Tab.Content>
              </Card>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  )
}

export default Dashboard
