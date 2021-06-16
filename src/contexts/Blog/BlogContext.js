import { createContext, useEffect, useReducer } from "react";
import { getVideos, BlogReducer, getPosts } from "./BlogReducer";

export const BlogContext = createContext();

const storage = localStorage.getItem("posts")
  ? JSON.parse(localStorage.getItem("posts"))
  : [];

const initialState = {
  posts: storage,
};

const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BlogReducer, initialState);

  const loadPosts = async (payload) => {
    await getPosts();
    console.log("posqw");
    dispatch({ type: "LOAD_POSTS", payload });
  };

  const updatePost = (payload) => {
    dispatch({ type: "UPDATE_POST", payload });
  };

  const savePost = async (payload, event) => {
    event.preventDefault();
    dispatch({ type: "SAVE_POST", payload });
  };

  const setPostInView = (payload) => {
    dispatch({ type: "SET_POSTINVIEW", payload });
  };
  const contextValues = {
    loadPosts,
    updatePost,
    savePost,
    ...state,
  };

  return (
    <BlogContext.Provider value={contextValues}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
