"use client"

import { createContext, useState } from "react"
export const isModifyEventContext = createContext()
export const isDeleteEventContext = createContext()
export const isSavedEventDeletedContext = createContext()
export const isApplicantDetailsUpdatedContext = createContext()

const ContextApi = ({ children }) => {
  const [isApplicantUpdated, setIsApplicantUpdated] = useState("")
  const [isModifyEvent, setIsModifyEvent] = useState("")
  const [isDeleteEvent, setIsDeleteEvent] = useState("")
  const [isSavedEventDeleted, setIsSavedEventDeleted] = useState("")
  return (
    <isApplicantDetailsUpdatedContext.Provider value={{ isApplicantUpdated, setIsApplicantUpdated }}>
      <isModifyEventContext.Provider value={{ isModifyEvent, setIsModifyEvent }}>
        <isSavedEventDeletedContext.Provider value={{ isSavedEventDeleted, setIsSavedEventDeleted }}>
          <isDeleteEventContext.Provider value={{ isDeleteEvent, setIsDeleteEvent }}>
            {children}
          </isDeleteEventContext.Provider>
        </isSavedEventDeletedContext.Provider>
      </isModifyEventContext.Provider>
    </isApplicantDetailsUpdatedContext.Provider>
  )
}

export default ContextApi
