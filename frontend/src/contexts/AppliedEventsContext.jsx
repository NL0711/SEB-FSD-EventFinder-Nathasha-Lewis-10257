import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAppliedEventsAPI } from '../services/allAPI';
import { tokenAuthContext } from './AuthContextAPI';

export const AppliedEventsContext = createContext();

const AppliedEventsProvider = ({ children }) => {
  const { isAuthorised } = useContext(tokenAuthContext);
  const [appliedEventIds, setAppliedEventIds] = useState(new Set()); 

  const fetchAppliedEvents = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setAppliedEventIds(new Set()); 
      return;
    }
    const reqHeader = { Authorization: `Bearer ${token}` };
    try {
      const result = await getAppliedEventsAPI(reqHeader);
      if (result.status === 200 && Array.isArray(result.data)) {
        const idSet = new Set(result.data.map(item => item.eventId?.toString())); 
        setAppliedEventIds(idSet);
      } else {
        setAppliedEventIds(new Set());
      }
    } catch (err) {
      setAppliedEventIds(new Set()); 
    } 
  };

  const addAppliedEventId = (eventId) => {
    const idStr = eventId?.toString();
    if (!idStr) return;
    setAppliedEventIds(prevIds => {
        if (prevIds.has(idStr)) return prevIds;
        const newSet = new Set(prevIds);
        newSet.add(idStr);
        return newSet;
    });
  };

  useEffect(() => {
    if (isAuthorised) {
      fetchAppliedEvents(); 
    } else {
      setAppliedEventIds(new Set()); 
    }
  }, [isAuthorised]);

  return (
    <AppliedEventsContext.Provider value={{ appliedEventIds, addAppliedEventId }}>
      {children}
    </AppliedEventsContext.Provider>
  );
};

export default AppliedEventsProvider; 