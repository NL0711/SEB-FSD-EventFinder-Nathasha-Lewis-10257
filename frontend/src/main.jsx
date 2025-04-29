import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import "./bootstrap.min.css"
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
import AuthContextAPI from "./contexts/AuthContextAPI.jsx"
import ContextApi from "./contexts/ContextAPI.jsx"
import AppliedEventsProvider from "./contexts/AppliedEventsContext.jsx"
ContextApi

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextAPI>
      <AppliedEventsProvider>
        <ContextApi>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ContextApi>
      </AppliedEventsProvider>
    </AuthContextAPI>
  </StrictMode>,
)
