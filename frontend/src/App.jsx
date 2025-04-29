"use client"

import { Route, Routes, useLocation } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import EventDetail from "./pages/EventDetail"
import AllEvents from "./pages/AllEvents"
import Footer from "./components/Layout/Footer"
import Header from "./components/Layout/Header"
import { useContext, useEffect } from "react"
import { tokenAuthContext } from "./contexts/AuthContextAPI"
import AppliedEventsProvider from "./contexts/AppliedEventsContext"
import SavedEventsProvider from "./contexts/SavedEventsContext"

function App() {
  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)
  const location = useLocation()

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
    <SavedEventsProvider>
      <AppliedEventsProvider>
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
            {isAuthorised ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/all-events" element={<AllEvents />} />
              </>
            ) : (
              <>
                <Route path="/dashboard" element={<Auth insideRegister={false} />} />
                <Route path="/all-events" element={<Auth insideRegister={false} />} />
              </>
            )}
            <Route path="/login" element={<Auth insideRegister={false} />} />
            <Route path="/register" element={<Auth insideRegister={true} />} />
          </Routes>
          <Footer />
        </>
      </AppliedEventsProvider>
    </SavedEventsProvider>
  )
}

export default App