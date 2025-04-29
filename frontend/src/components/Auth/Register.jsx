"use client"

import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { applyEventAPI } from "../../services/allAPI"
import { useNavigate } from "react-router-dom"

// Modified to take props
const Register = ({ eventId, eventTitle, variant = "primary", className = "", size = "" }) => {
  const navigate = useNavigate()
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    phoneNo: ""
  })
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // Function to handle registration
  const handleRegister = async (e) => {
    e.preventDefault()
    
    const { username, email, phoneNo } = inputData
    
    // Simple validation
    if (!username || username.trim() === "") {
      alert("Please enter your name")
      return
    }
    
    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert("Please enter a valid email address")
      return
    }
    
    // Get token
    const token = sessionStorage.getItem("token")
    if (!token) {
      alert("Please log in to register for this event")
      navigate("/login")
      return
    }
    
    // Regular flow for all events (numeric or string IDs)
    
    // Get user data from session storage if available
    let userId = "guest"
    try {
      const userData = JSON.parse(sessionStorage.getItem("existingUser"))
      if (userData && userData._id) {
        userId = userData._id
      }
    } catch (err) {
      // console.error("Error parsing user data:", err) // Remove console
    }
    
    // Prepare request body with the event ID
    const reqbody = {
      eventId,
      registeredUser: { 
        userId, 
        username, 
        email, 
        phoneNo
      }
    }
    
    // Set auth header
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    
    try {
      const result = await applyEventAPI(reqbody, reqHeader)
      
      if (result.status === 200) {
        alert("Registration successful!")
        setInputData({ username: "", email: "", phoneNo: "" })
        handleClose()
      } else {
        // Display more specific error from backend if available
        const errorMessage = result.response?.data || "Registration failed. Please try again.";
        alert(errorMessage);
      }
    } catch (err) {
      // console.error("Registration API error:", err); // Remove console
      alert("An error occurred during registration. Please try again.")
    }
  }

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInputData(prev => ({ ...prev, [name]: value }))
  }
  
  return (
    <>
      <Button 
        variant={variant} 
        className={className}
        size={size}
        onClick={handleShow}
      >
        Register
      </Button>

      {/* Registration Modal */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary fw-semibold">
            Register for {eventTitle || "Event"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="username"
                value={inputData.username}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={inputData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button 
            onClick={handleRegister} 
            variant="primary" 
            className="px-3 px-5"
          >
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Register
