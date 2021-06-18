import { createContext, useEffect, useReducer } from "react";
import { getMessages, ChatReducer } from "./ChatReducer";

export const ChatContext = createContext();

const initialState = {
  messages: [],
};

const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ChatReducer, initialState);

  const loadMessages = async (payload) => {
    await getMessages(payload.collection, payload.id).then((messages) => {
      dispatch({ type: "LOAD_MESSAGES", messages });
    });
  };

  const contextValues = {
    loadMessages,
    ...state,
  };

  return (
    <ChatContext.Provider value={contextValues}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
