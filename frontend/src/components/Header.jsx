"use client"

import { useContext } from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { tokenAuthContext } from "../contexts/AuthContextAPI"
import "./Header.css"

const Header = ({ isAllEventsPage, isDashboardPage, isEventDetailPage, isHomePage }) => {
  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)
  const navigate = useNavigate()

  const logout = () => {
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate("/")
  }

  return (
    <>
      {/* Main header with logo and navigation */}
      <Navbar bg="white" expand="lg" className="py-3 shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src="/logo.svg"
              alt="EventFinder Logo"
              height="50"
              className="me-2"
            />
            <span className="fw-bold text-primary">EventFinder</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className={`fw-bold mx-2 ${isHomePage ? "text-primary" : "text-dark"}`}>
                HOME
              </Nav.Link>

              {isAuthorised && (
                <>
                  <Nav.Link
                    as={Link}
                    to="/all-events"
                    className={`fw-bold mx-2 ${isAllEventsPage ? "text-primary" : "text-dark"}`}
                  >
                    ALL EVENTS
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/dashboard"
                    className={`fw-bold mx-2 ${isDashboardPage ? "text-primary" : "text-dark"}`}
                  >
                    DASHBOARD
                  </Nav.Link>
                </>
              )}

              {!isAuthorised ? (
                <>
                  <Nav.Link as={Link} to="/login" className="fw-bold mx-2 text-dark">
                    LOGIN
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={logout} className="fw-bold mx-2 text-dark">
                  LOGOUT
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
