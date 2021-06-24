import { createContext, useEffect, useReducer, useState } from "react";
import { auth, db } from "../../services/firebase";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [pending, setPending] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setPending(false);
      setCurrentUser(user.uid);
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  const verifyUser = async () => {
    auth.onAuthStateChanged((user) => {
      setPending(false);

      setCurrentUser(user.uid);
    });
  };

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
                setCurrentUser(user.user.uid);
                window.location.href = "/home";
              });
          } catch (e) {
            await auth.signOut();
            localStorage.clear();
            alert(e);
            // toast.error(e.message);
          }
        } else {
          await auth.signOut();
          localStorage.clear();
          alert(
            "O usuário não tem permissão para acessar o dashboard. Contate o administrador do sistema"
          );
          // toast.error("Usuário não existe ou não é um administrador");
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const doSignOut = async () => {
    setCurrentUser(null);
    await auth.signOut();
    localStorage.clear();
  };

  const contextValues = {
    verifyUser,
    doSignIn,
    doSignOut,
    currentUser,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
