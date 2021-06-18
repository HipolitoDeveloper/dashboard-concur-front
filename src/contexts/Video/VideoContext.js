import { createContext, useEffect, useReducer } from "react";
import { getVideos, VideosReducer } from "./VideoReducer";

export const VideoContext = createContext();

const getVideosFromStorage = localStorage.getItem("videos")
  ? JSON.parse(localStorage.getItem("videos"))
  : [];

const getVideoInViewFromStorage = localStorage.getItem("videoInView")
  ? JSON.parse(localStorage.getItem("videoInView"))
  : [];

const initialState = {
  videos: getVideosFromStorage,
  videoInView: getVideoInViewFromStorage,
};

const VideosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(VideosReducer, initialState);

  const loadVideos = async (payload) => {
    await getVideos().then(() => {
      dispatch({ type: "LOAD_VIDEO", payload });
    });
  };

  const updateVideo = async (payload) => {
    dispatch({ type: "UPDATE_VIDEO", payload });
    await loadVideos();
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
