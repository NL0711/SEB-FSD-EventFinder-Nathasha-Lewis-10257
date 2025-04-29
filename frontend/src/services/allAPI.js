import commonAPI from "./commonAPI"
import SERVER_URL from "./serverUrl"

export const loginAPI = async (reqbody) => {
  return await commonAPI("POST", `${SERVER_URL}/login`, reqbody)
}
export const addEventsAPI = async (reqbody, reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/add-events`, reqbody, reqHeader)
}
export const getAllEventsAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/event`, "", reqHeader)
}
export const getUserEventsAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/user-events`, {}, reqHeader)
}
export const getEventDetailsAPI = async (id, reqHeader) => {
  const url = `${SERVER_URL}/event/${id}`;
  return await commonAPI("GET", url, {}, reqHeader)
}
export const getHomeEventsAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/home-events`, {}, reqHeader)
}
export const applyEventAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/apply-event`, reqBody, reqHeader)
}
export const getAppliedEventsAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/apply-event/view`, {}, reqHeader)
}
export const getApplicantDetailsAPI = async (eventId, reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/apply-event/${eventId}/details`, {}, reqHeader)
}
export const deleteApplicantAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/apply-event/${id}/remove-applicant`, reqBody, reqHeader)
}
export const saveEventAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/saved-events`, reqBody, reqHeader)
}
export const getProfileAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/profile`, {}, reqHeader)
}
export const removeSavedEventAPI = async (reqBody, reqHeader) => {
  return await commonAPI("DELETE", `${SERVER_URL}/saved-events`, reqBody, reqHeader)
}
export const getUserSavedEventIdsAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/saved-events/ids`, {}, reqHeader)
}
export const getSavedEventDetailsAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/saved-events/details`, {}, reqHeader)
}