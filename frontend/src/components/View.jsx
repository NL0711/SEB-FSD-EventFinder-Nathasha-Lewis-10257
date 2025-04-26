"use client"

import { useContext, useState } from "react"
import { OverlayTrigger, Tab, Tabs, Tooltip } from "react-bootstrap"
import SavedEvents from "./SavedEvents"
import AppliedEvents from "./AppliedEvents"
import MyEvents from "./MyEvents"
import AddEvent from "./AddEvent"
import { deleteAllSavedEventsAPI } from "../services/allAPI"
import { isSavedEventDeletedContext } from "../contexts/ContextAPI"

const View = () => {
  const { isSavedEventDeleted, setIsSavedEventDeleted } = useContext(isSavedEventDeletedContext)
  const [activeKey, setActiveKey] = useState("applied")

  const handleSelect = (key) => {
    setActiveKey(key)
  }

  const getTabStyle = (key) => {
    return activeKey === key ? "text-warning" : "text-primary"
  }

  const handleDeleteAll = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      }
      try {
        const result = await deleteAllSavedEventsAPI(reqHeader)
        console.log(result)

        if (result.status == 200) {
          setIsSavedEventDeleted(result.data)
          alert(result.data.message)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  return (
    // display the saved events , applied events, past events and my events on the dashboard
    <>
      <Tabs
        activeKey={activeKey}
        onSelect={handleSelect}
        id="justify-tab-example"
        className="mb-3 mt-5 px-5 shadow-sm"
        justify
      >
        <Tab eventKey="applied" title={<span className={getTabStyle("applied")}>Applied Events</span>}>
          <AppliedEvents />
        </Tab>
        <Tab eventKey="saved" title={<span className={getTabStyle("saved")}>Saved Events</span>}>
          <SavedEvents />
          <OverlayTrigger key="top" placement="top" overlay={<Tooltip>Delete all Saved Events</Tooltip>}>
            <button
              onClick={handleDeleteAll}
              style={{ position: "absolute", right: "1rem", zIndex: "10" }}
              className="btn btn-danger rounded-circle px-2 border-2 fw-bold"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </OverlayTrigger>
        </Tab>
        <Tab eventKey="myEvents" title={<span className={getTabStyle("myEvents")}>My Events</span>}>
          <MyEvents />
          <AddEvent />
        </Tab>
        {/* <Tab eventKey="past" title={<span className={getTabStyle('past')}>Past Events</span>}>
        <PastEvents/>
      </Tab> */}
        {/* <Tab eventKey="profile" title={<span className={getTabStyle('profile')}>Profile</span>}>
        <Profile/>
      </Tab> */}
      </Tabs>
    </>
  )
}

export default View
