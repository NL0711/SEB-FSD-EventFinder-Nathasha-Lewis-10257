"use client"

import { Route, Routes, useLocation } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import EventDetail from "./pages/EventDetail"
import AllEvents from "./pages/AllEvents"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { useContext, useEffect } from "react"
import { tokenAuthContext } from "./contexts/AuthContextAPI"

function App() {
  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)
  const location = useLocation() // to get the current location

  // Determine if the current page is 'AllEvents' or 'Dashboard'
  const isAllEventsPage = location.pathname === "/all-events"
  const isDashboardPage = location.pathname === "/dashboard"
  const isEventDetailPage = location.pathname.includes("/event")
  const isHomePage = location.pathname === "/"

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsAuthorised(true)
    } else {
      setIsAuthorised(false)
    }
  }, [])

  return (
    <>
      <Header
        isAllEventsPage={isAllEventsPage}
        isDashboardPage={isDashboardPage}
        isEventDetailPage={isEventDetailPage}
        isHomePage={isHomePage}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetail />} />
        {isAuthorised && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/all-events" element={<AllEvents />} />
          </>
        )}
        <Route path="/login" element={<Auth insideRegister={false} />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
