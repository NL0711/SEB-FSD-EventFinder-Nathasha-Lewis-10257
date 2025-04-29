import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { applyEventAPI, saveEventAPI, removeSavedEventAPI } from '../../services/allAPI';
import { tokenAuthContext } from '../../contexts/AuthContextAPI';
import { AppliedEventsContext } from '../../contexts/AppliedEventsContext';
import { SavedEventsContext } from '../../contexts/SavedEventsContext';

const EventActionButtons = ({ eventId }) => {
  const { isAuthorised } = useContext(tokenAuthContext);
  const { appliedEventIds, isLoadingStatus: isLoadingAppliedStatus, addAppliedEventId } = useContext(AppliedEventsContext);
  const { savedEventIds, addSavedEventId, removeSavedEventId, isLoadingSavedStatus } = useContext(SavedEventsContext);
  
  const [isRegistering, setIsRegistering] = useState(false); 
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const isApplied = appliedEventIds.has(eventId?.toString());
  const isSaved = savedEventIds.has(eventId?.toString());

  const handleRegister = async () => {
    if (!isAuthorised) {
      alert("Please login to register for events.");
      navigate("/login");
      return;
    }

    const token = sessionStorage.getItem("token");
    const userData = JSON.parse(sessionStorage.getItem("existingUser"));

    if (!token || !userData?._id) {
      alert("Authentication error or incomplete user data. Please log in again.");
      return;
    }

    setIsRegistering(true);
    const reqHeader = { Authorization: `Bearer ${token}` };
    const reqBody = {
      eventId: eventId,
      registeredUser: {
        userId: userData._id,
        username: userData.username,
        email: userData.email
      }
    };

    try {
      const result = await applyEventAPI(reqBody, reqHeader);
      if (result.status === 200) {
        alert("Successfully registered!");
        addAppliedEventId(eventId);
      } else {
        alert(result.response?.data || "Registration failed.");
      }
    } catch (error) {
      // alert("An error occurred during registration."); // Already removed
    } finally {
      setIsRegistering(false);
    }
  };

  const handleToggleSave = async () => {
    if (!isAuthorised) {
      alert("Please login to save events.");
      navigate("/login");
      return;
    }

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Authentication error. Please log in again.");
      return;
    }

    setIsSaving(true);
    const reqHeader = { Authorization: `Bearer ${token}` };
    const reqBody = { eventId: eventId };

    try {
      let result;
      if (isSaved) {
        result = await removeSavedEventAPI(reqBody, reqHeader);
        if (result.status === 200) {
          removeSavedEventId(eventId);
        } else {
          alert(result.response?.data?.message || "Failed to unsave.");
        }
      } else {
        result = await saveEventAPI(reqBody, reqHeader);
        if (result.status === 201) {
          addSavedEventId(eventId);
        } else {
          alert(result.response?.data?.message || "Failed to save.");
        }
      }
    } catch (error) {
      alert("An error occurred updating save status.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="d-grid gap-2 d-sm-flex justify-content-start">
      <Button 
        variant={isApplied ? "success" : "primary"} 
        onClick={!isApplied ? handleRegister : undefined}
        disabled={isApplied || isRegistering || isLoadingAppliedStatus}
        size="lg"
        className="me-sm-2 mb-2 mb-sm-0"
      >
        {isLoadingAppliedStatus ? "Checking..." : isApplied ? "\u2713 Applied" : isRegistering ? "Applying..." : "Apply Now"}
      </Button>
      <Button 
        variant={isSaved ? "warning" : "outline-warning"} 
        onClick={handleToggleSave} 
        disabled={isSaving || isLoadingSavedStatus}
        size="lg"
      >
        <i className={`fa-${isSaved ? 'solid' : 'regular'} fa-bookmark me-2`}></i>
        {isSaving ? (isSaved ? 'Removing...' : 'Saving...') : (isSaved ? 'Saved' : 'Save Event')}
      </Button>
    </div>
  );
};

export default EventActionButtons; 