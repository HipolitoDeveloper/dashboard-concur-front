import { createContext, useEffect, useReducer } from "react";
import { getEvents, EventReducer } from "./EventReducer";

export const EventContext = createContext();

// const getVideosFromStorage = localStorage.getItem("videos")
//   ? JSON.parse(localStorage.getItem("videos"))
//   : [];

// const getVideoInViewFromStorage = localStorage.getItem("videoInView")
//   ? JSON.parse(localStorage.getItem("videoInView"))
//   : [];

const initialState = {
  events: [],
  eventInView: {
    data: {
      is_live: true,
      participants: [],
      images: [],
    },
  },
};

const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(EventReducer, initialState);

  const loadEvents = async (payload) => {
    await getEvents().then((events) => {
      dispatch({ type: "LOAD_EVENTS", events });
    });
  };

  const updateEvent = async (payload) => {
    dispatch({ type: "UPDATE_EVENT", payload });
  };

  const saveEvent = async (payload) => {
    dispatch({ type: "SAVE_EVENT", payload });
  };

  const setEventInView = (payload) => {
    dispatch({ type: "SET_EVENTINVIEW", payload });
  };

  const clearEventInView = (payload) => {
    dispatch({ type: "CLEAR_EVENTINVIEW", payload });
  };

  const deleteEvent = (payload) => {
    dispatch({ type: "DELETE_EVENT", payload });
  };

  const saveParticipant = (payload) => {
    dispatch({ type: "SAVE_PARTICIPANT", payload });
  };

  const editParticipant = (payload) => {
    dispatch({ type: "EDIT_PARTICIPANT", payload });
  };

  const addParticipant = (payload) => {
    dispatch({ type: "ADD_PARTICIPANT", payload });
  };

  const deleteParticipant = (payload) => {
    dispatch({ type: "DELETE_PARTICIPANT", payload });
  };

  const handleChangeParticipant = (payload) => {
    dispatch({ type: "HANDLE_PARTICIPANT", payload });
  };

  const fixEvent = (payload) => {
    dispatch({ type: "FIX_EVENT", payload });
  };

  const contextValues = {
    loadEvents,
    updateEvent,
    saveEvent,
    setEventInView,
    clearEventInView,
    deleteEvent,
    addParticipant,
    deleteParticipant,
    handleChangeParticipant,
    saveParticipant,
    editParticipant,
    fixEvent,
    ...state,
  };

  return (
    <EventContext.Provider value={contextValues}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
