import { createContext, useEffect, useReducer } from "react";
import { getVideos, VideosReducer } from "./VideosReducer";

export const VideoContext = createContext();

const storage = localStorage.getItem("videos")
  ? JSON.parse(localStorage.getItem("videos"))
  : [];

const initialState = {
  videos: storage,
};

const VideosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(VideosReducer, initialState);

  const loadVideos = async (payload) => {
    await getVideos();
    dispatch({ type: "LOAD_VIDEO", payload });
  };

  const updateVideo = (payload) => {
    dispatch({ type: "UPDATE_VIDEO", payload });
  };
  const contextValues = {
    loadVideos,
    updateVideo,
    ...state,
  };

  return (
    <VideoContext.Provider value={contextValues}>
      {children}
    </VideoContext.Provider>
  );
};

export default VideosProvider;
