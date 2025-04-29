import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUserSavedEventIdsAPI } from '../services/allAPI';
import { tokenAuthContext } from './AuthContextAPI';

export const SavedEventsContext = createContext();

const SavedEventsProvider = ({ children }) => {
  const { isAuthorised } = useContext(tokenAuthContext);
  const [savedEventIds, setSavedEventIds] = useState(new Set());
  const [isLoadingSavedStatus, setIsLoadingSavedStatus] = useState(false);

  const fetchSavedEventIds = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setSavedEventIds(new Set());
      setIsLoadingSavedStatus(false);
      return;
    }

    setIsLoadingSavedStatus(true);
    const reqHeader = { Authorization: `Bearer ${token}` };

    try {
      const result = await getUserSavedEventIdsAPI(reqHeader);
      if (result.status === 200 && Array.isArray(result.data)) {
        const idSet = new Set(result.data.map(id => id?.toString()));
        setSavedEventIds(idSet);
      } else {
        setSavedEventIds(new Set());
      }
    } catch (err) {
      setSavedEventIds(new Set());
    } finally {
      setIsLoadingSavedStatus(false);
    }
  };

  const addSavedEventId = (eventId) => {
    const idStr = eventId?.toString();
    if (!idStr) return;
    setSavedEventIds(prevIds => {
      if (prevIds.has(idStr)) return prevIds;
      const newSet = new Set(prevIds);
      newSet.add(idStr);
      return newSet;
    });
  };

  const removeSavedEventId = (eventId) => {
    const idStr = eventId?.toString();
    if (!idStr) return;
    setSavedEventIds(prevIds => {
      if (!prevIds.has(idStr)) return prevIds;
      const newSet = new Set(prevIds);
      newSet.delete(idStr);
      return newSet;
    });
  };

  useEffect(() => {
    if (isAuthorised) {
      fetchSavedEventIds();
    } else {
      setSavedEventIds(new Set());
    }
  }, [isAuthorised]);

  return (
    <SavedEventsContext.Provider value={{
      savedEventIds,
      isLoadingSavedStatus,
      addSavedEventId,
      removeSavedEventId
    }}>
      {children}
    </SavedEventsContext.Provider>
  );
};

export default SavedEventsProvider; 