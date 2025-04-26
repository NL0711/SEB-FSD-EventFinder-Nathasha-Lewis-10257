"use client"

import { useContext, useEffect, useState } from "react"
import { deleteApplicantAPI, getApplicantDetailsAPI } from "../services/allAPI"
import { useParams } from "react-router-dom"
import { isApplicantDetailsUpdatedContext } from "../contexts/ContextAPI"

const ApplicantManagement = () => {
  const { isApplicantUpdated, setIsApplicantUpdated } = useContext(isApplicantDetailsUpdatedContext)
  const [appliedEventsDetails, setAppliedEventsDetails] = useState("")
  const [applicantStatus, setApplicantStatus] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  // console.log(appliedEvents);
  const { id } = useParams()
  // console.log(id);
  console.log(appliedEventsDetails)

  useEffect(() => {
    if (id) getApplicantDetails()
  }, [id, isApplicantUpdated])

  const handleDeleteApplicant = async (email) => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      }
      try {
        const result = await deleteApplicantAPI(id, email, reqHeader)
        console.log(result)

        if (result.status == 200) {
          alert("Applicant removal is successfull!!")
          // Update the state immediately
          setAppliedEventsDetails((prevState) => ({
            ...prevState,
            registeredUser: prevState.registeredUser.filter((user) => user.email !== email),
          }))
          setApplicantStatus((prev) => !prev)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  const getApplicantDetails = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      }
      try {
        const result = await getApplicantDetailsAPI(id, reqHeader)
        // console.log(result);

        if (result.status == 200) {
          setAppliedEventsDetails(result.data)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
        setIsApplicantUpdated(false)
      }
    }
  }
  return (
    <div>
      <h1 className="text-primary">Registration Details of Participants</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Registration Id</th>
            <th>Username</th>
            <th>User Email</th>
            <th>User contact number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : appliedEventsDetails && appliedEventsDetails.registeredUser.length > 0 ? (
            appliedEventsDetails.registeredUser.map((user, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>
                  {appliedEventsDetails._id}/{index + 1}/{user.username}
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phoneNo}</td>
                <td>
                  <i onClick={() => handleDeleteApplicant(user.email)} className="fa-solid fa-trash text-danger"></i>
                </td>
              </tr>
            ))
          ) : (
            <div className="text-danger fw-bolder">No applicants yet!!!</div>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ApplicantManagement
