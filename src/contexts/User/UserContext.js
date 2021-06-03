import { createContext, useEffect, useReducer, useState } from "react";
import { UserReducer } from "./UserReducer";
import { auth } from "../../services/firebase";

export const UserContext = createContext();

const getStorage = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const setStorage = (currentUser) => {
  localStorage.setItem(
    "currentUser",
    JSON.stringify(currentUser.length > 0 ? currentUser : null)
  );
};
const initialState = { currentUser: getStorage };

const UserProvider = ({ children }) => {
  const [pending, setPending] = useState(true);
  const [state, dispatch] = useReducer(UserReducer, initialState);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setPending(false);
      if (user != null) setStorage(user.uid);
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  const doSignIn = (payload) => {
    return new Promise((resolve) => {
      resolve(dispatch({ type: "SIGN_IN", payload }));
    });
  };

  const contextValues = {
    doSignIn,
    ...state,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
