import { createContext, useReducer } from "react";
import { getTags, TagsReducer } from "./TagsReducer";

export const TagsContext = createContext();

const initialState = {
  tags: [],
};

const TagsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TagsReducer, initialState);

  const loadTags = async (payload) => {
    await getTags().then((tags) => {
      dispatch({ type: "LOAD_TAGS", tags });
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
