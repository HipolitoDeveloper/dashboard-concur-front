import { createContext, useReducer } from "react";
import { getTags, TagsReducer } from "./TagsReducer";

export const TagsContext = createContext();

const storage = localStorage.getItem("tags")
  ? JSON.parse(localStorage.getItem("tags"))
  : [];

const initialState = {
  tags: storage,
};

const TagsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TagsReducer, initialState);

  const loadTags = async (payload) => {
    await getTags().then(() => {
      dispatch({ type: "LOAD_TAGS", payload });
    });
  };

  const addTags = async (payload, event) => {
    event.preventDefault();
    dispatch({ type: "ADD_TAG", payload });
  };

  const contextValues = {
    addTags,
    loadTags,
    ...state,
  };

  return (
    <TagsContext.Provider value={contextValues}>
      {children}
    </TagsContext.Provider>
  );
};

export default TagsProvider;
