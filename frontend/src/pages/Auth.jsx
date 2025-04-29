"use client"

import { useState, useContext } from "react"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { loginAPI } from "../services/allAPI"
import { tokenAuthContext } from "../contexts/AuthContextAPI"

function Auth() {
  const { setIsAuthorised } = useContext(tokenAuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMsg("")
    setIsLoading(true)
    
    // Validate inputs
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please enter both email and password")
      setIsLoading(false)
      return
    }
    
    // Create request body
    const reqBody = {
      email,
      password
    }
    
    try {
      // Call login API
      const result = await loginAPI(reqBody)
      
      if (result.status === 200) {
        // Store token in session storage
        sessionStorage.setItem("token", result.data.token)
        // Store user data in session storage
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.user))
        // Update auth context
        setIsAuthorised(true)
        // Clear inputs
        setEmail("")
        setPassword("")
        // Redirect to home or dashboard
        navigate("/dashboard")
      } else {
        // Handle login failure
        setErrorMsg(result.response?.data || "Login failed. Please check your credentials.")
      }
    } catch (err) {
      setErrorMsg("Invalid credentials or user not found.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", paddingTop: "120px", paddingBottom: "50px", background: "#f8f9fa" }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={5}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <p className="text-muted">Login to access your EventFinder account</p>
                </div>

                {errorMsg && (
                  <Alert variant="danger" className="mb-4">
                    {errorMsg}
                  </Alert>
                )}

                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-4">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-center">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      className="w-50 py-2" 
                    >
                      Login
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Auth
