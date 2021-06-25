import { createContext, useEffect, useReducer } from "react";
import { getVideos, VideosReducer } from "./VideoReducer";

export const VideoContext = createContext();

const initialState = {
  videos: [],
  videoInView: {},
};

const VideosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(VideosReducer, initialState);

  const loadVideos = async (payload) => {
    await getVideos().then((videos) => {
      dispatch({ type: "LOAD_VIDEO", videos });
    });
  };

  const updateVideo = async (payload) => {
    dispatch({ type: "UPDATE_VIDEO", payload });
  };

  const saveVideo = async (payload) => {
    dispatch({ type: "SAVE_VIDEO", payload });
  };

  const setVideoInView = (payload) => {
    dispatch({ type: "SET_VIDEOINVIEW", payload });
  };

  const clearVideoInView = (payload) => {
    dispatch({ type: "CLEAR_VIDEOINVIEW", payload });
  };

  const deleteVideo = async (payload) => {
    dispatch({ type: "DELETE_VIDEO", payload });
  };

  const contextValues = {
    loadVideos,
    updateVideo,
    saveVideo,
    setVideoInView,
    clearVideoInView,
    deleteVideo,
    ...state,
  };

  return (
    <VideoContext.Provider value={contextValues}>
      {children}
    </VideoContext.Provider>
  );
};

export default VideosProvider;
