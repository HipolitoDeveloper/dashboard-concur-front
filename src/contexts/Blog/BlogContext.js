import { createContext, useEffect, useReducer } from "react";
import { getVideos, BlogReducer, getPosts } from "./BlogReducer";

export const BlogContext = createContext();

const initialState = {
  posts: [],
  postInView: {},
};

const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BlogReducer, initialState);

  const loadPosts = async (payload) => {
    await getPosts().then((posts) => {
      dispatch({ type: "LOAD_POSTS", posts });
    });
  };

  const updatePost = async (payload) => {
    dispatch({ type: "UPDATE_POST", payload });
  };

  const savePost = async (payload) => {
    dispatch({ type: "SAVE_POST", payload });
  };

  const setPostInView = (payload) => {
    dispatch({ type: "SET_POSTINVIEW", payload });
  };

  const deletePost = async (payload) => {
    dispatch({ type: "DELETE_POST", payload });
  };

  const clearPostInView = (payload) => {
    dispatch({ type: "CLEAR_POSTINVIEW", payload });
  };
  const contextValues = {
    loadPosts,
    updatePost,
    savePost,
    setPostInView,
    clearPostInView,
    deletePost,
    ...state,
  };

  return (
    <BlogContext.Provider value={contextValues}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
