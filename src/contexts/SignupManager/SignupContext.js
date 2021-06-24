import { createContext, useEffect, useReducer } from "react";
import { getPlaces, getVideos, SignupReducer } from "./SignupReducer";

export const SignupContext = createContext();

const initialState = {
  places: [],
};

const SignupProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SignupReducer, initialState);

  const loadPlaces = async (payload) => {
    await getPlaces().then((places) => {
      dispatch({ type: "LOAD_PLACES", places });
    });
  };

  const savePlace = (payload) => {
    dispatch({ type: "SAVE_PLACE", payload });
  };

  const deletePlace = (payload) => {
    dispatch({ type: "DELETE_PLACE", payload });
  };

  const handlePlace = (payload) => {
    dispatch({ type: "HANDLE_PLACE", payload });
  };

  const updatePlace = (payload) => {
    dispatch({ type: "UPDATE_PLACE", payload });
  };

  const addPlace = (payload) => {
    dispatch({ type: "ADD_PLACE", payload });
  };

  const contextValues = {
    loadPlaces,
    savePlace,
    deletePlace,
    handlePlace,
    updatePlace,
    addPlace,
    ...state,
  };

  return (
    <SignupContext.Provider value={contextValues}>
      {children}
    </SignupContext.Provider>
  );
};

export default SignupProvider;
