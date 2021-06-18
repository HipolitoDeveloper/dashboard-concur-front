import { createContext, useEffect, useReducer, useState } from "react";
import { auth, db } from "../../services/firebase";

export const UserContext = createContext();

const getStorage = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const setStorage = (currentUser) => {
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
};

const UserProvider = ({ children }) => {
  const [pending, setPending] = useState(true);
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setPending(false);
      if (user != null) {
        setStorage(user.uid);
        setCurrentUser(user.uid);
      }
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  const doSignIn = async (event, payload) => {
    event.preventDefault();
    await db
      .collection("usersCollection")
      .where("email", "==", payload.email)
      .get()
      .then(async (querySnapshot) => {
        if (
          querySnapshot.docs.length > 0 &&
          querySnapshot.docs[0].data().isAdmin === true
        ) {
          try {
            await auth
              .signInWithEmailAndPassword(payload.email, payload.password)
              .then((user) => {
                setStorage(user.user.uid);
                window.location.href = "/home";
              });
          } catch (e) {
            await auth.signOut();
            localStorage.clear();
            // toast.error(e.message);
          }
        } else {
          await auth.signOut();
          localStorage.clear();
          // toast.error("Usuário não existe ou não é um administrador");
        }
      });
  };

  const contextValues = {
    doSignIn,
    currentUser,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
