import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAppliedEventsAPI } from '../services/allAPI';
import { tokenAuthContext } from './AuthContextAPI'; // Assuming Auth context provides login status

export const AppliedEventsContext = createContext();

const AppliedEventsProvider = ({ children }) => {
  const { isAuthorised } = useContext(tokenAuthContext);
  // Use a Set for efficient ID lookup
  const [appliedEventIds, setAppliedEventIds] = useState(new Set()); 
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);

  const fetchAppliedEvents = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setAppliedEventIds(new Set()); // Clear IDs if no token
      setIsLoadingStatus(false);
      return;
    }

    setIsLoadingStatus(true);
    const reqHeader = { Authorization: `Bearer ${token}` };

    try {
      // This API returns an array like [{eventId: "id1"}, {eventId: "id2"}]
      const result = await getAppliedEventsAPI(reqHeader);
      if (result.status === 200 && Array.isArray(result.data)) {
        // Extract just the event IDs and put them in a Set
        const idSet = new Set(result.data.map(item => item.eventId?.toString())); 
        setAppliedEventIds(idSet);
        console.log("[AppliedEventsContext] Fetched applied event IDs:", idSet);
      } else {
        console.log("[AppliedEventsContext] No applied events found or API error.");
        setAppliedEventIds(new Set());
      }
    } catch (err) {
      console.error("[AppliedEventsContext] Error fetching applied events:", err);
      setAppliedEventIds(new Set()); // Clear on error
    } finally {
      setIsLoadingStatus(false);
    }
  };

  // Fetch applied events when auth status changes
  useEffect(() => {
    if (isAuthorised) {
      console.log("[AppliedEventsContext] User is authorised, fetching applied events...");
      fetchAppliedEvents();
    } else {
      console.log("[AppliedEventsContext] User is not authorised, clearing applied events.");
      setAppliedEventIds(new Set()); // Clear IDs on logout
    }
  }, [isAuthorised]);

  // Function to manually add an ID after registration (for instant feedback)
  const addAppliedEventId = (eventId) => {
    if (!eventId) return;
    setAppliedEventIds(prevIds => new Set(prevIds).add(eventId.toString()));
  };

  // Optional: Function to remove an ID if unapply feature is added
  const removeAppliedEventId = (eventId) => {
     if (!eventId) return;
     setAppliedEventIds(prevIds => {
        const newSet = new Set(prevIds);
        newSet.delete(eventId.toString());
        return newSet;
     });
  };

  return (
    <AppliedEventsContext.Provider value={{ appliedEventIds, isLoadingStatus, fetchAppliedEvents, addAppliedEventId, removeAppliedEventId }}>
      {children}
    </AppliedEventsContext.Provider>
  );
};

export default AppliedEventsProvider; 