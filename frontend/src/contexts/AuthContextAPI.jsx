"use client"

import { useState, createContext, useEffect } from "react"
export const tokenAuthContext = createContext()

const AuthContextAPI = ({ children }) => {
  const [isAuthorised, setIsAuthorised] = useState(false)

  useEffect(() => {
    setIsAuthorised(!!sessionStorage.getItem("token"));
  }, [])

  return <tokenAuthContext.Provider value={{ isAuthorised, setIsAuthorised }}>{children}</tokenAuthContext.Provider>
}

export default AuthContextAPI
