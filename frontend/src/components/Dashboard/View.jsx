"use client"

import { useState } from "react"
import { Tab, Tabs } from "react-bootstrap"
import SavedEvents from "./SavedEvents"
import AppliedEvents from "./AppliedEvents"
import MyEvents from "./MyEvents"
import AddEventModal from "../Event/AddEventModal"

const View = () => {
  const [activeKey, setActiveKey] = useState("applied")

  const handleSelect = (key) => {
    setActiveKey(key)
  }

  const getTabStyle = (key) => {
    return activeKey === key ? "text-warning" : "text-primary"
  }

  return (
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
        </Tab>
        <Tab eventKey="myEvents" title={<span className={getTabStyle("myEvents")}>My Events</span>}>
          <MyEvents />
          <AddEventModal />
        </Tab>
      </Tabs>
    </>
  )
}

export default View