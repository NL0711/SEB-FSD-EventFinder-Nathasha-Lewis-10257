"use client"

import { useState } from "react"
import { getProfileAPI } from "../services/allAPI"

const Profile = () => {
  const [currentUser, setCurrentUser] = useState("")

  // function to get User Details
  const getUserDetails = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      }
      try {
        const result = await getProfileAPI(reqHeader)
        if (result.status == 200) {
          setCurrentUser(result.data[0])
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  return (
    <div className="row">
      <div className="col-12 d-flex flex-column align-items-start justify-content-center">
        <h5>
          <span className="fw-semibold text-primary">Username: </span>Username
        </h5>
        <h5>
          <span className="fw-semibold text-primary mt-5">Email: </span>xxxx@gmail.com
        </h5>
      </div>
    </div>
  )
}

export default Profile
