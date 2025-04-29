"use client"

import { useEffect, useState } from "react"
import { getProfileAPI } from "../../services/allAPI"

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const getUserDetails = async () => {
    setLoading(true)
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      }
      try {
        const result = await getProfileAPI(reqHeader)
        if (result.status === 200 && result.data) {
          setCurrentUser(Array.isArray(result.data) ? result.data[0] : result.data)
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        setCurrentUser(null);
      } finally {
        setLoading(false)
      }
    } else {
      setCurrentUser(null);
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])

  if (loading) return <div className="text-center p-5">Loading profile...</div>

  if (!currentUser) return <div className="alert alert-warning m-3">Could not load profile data. Please ensure you are logged in.</div>

  return (
    <div className="p-3">
      <h5 className="mb-3">
        <span className="fw-semibold text-primary">Username: </span>
        {currentUser.username || "N/A"}
      </h5>
      <h5 className="mb-3">
        <span className="fw-semibold text-primary">Email: </span>
        {currentUser.email || "N/A"}
      </h5>
    </div>
  )
}

export default Profile