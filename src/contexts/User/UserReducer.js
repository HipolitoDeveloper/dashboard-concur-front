import { auth, db } from "../../services/firebase";
import { toast } from "react-toastify";

export const storage = (currentUser) => {
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
};

export const UserReducer = async (state, action) => {
  switch (action.type) {
    case "SIGN_IN":
      await db
        .collection("usersCollection")
        .where("email", "==", action.payload.email)
        .get()
        .then(async (querySnapshot) => {
          if (
            querySnapshot.docs.length > 0 &&
            querySnapshot.docs[0].data().isAdmin === true
          ) {
            try {
              await auth
                .signInWithEmailAndPassword(
                  action.payload.email,
                  action.payload.password
                )
                .then((user) => {
                  storage(user.user.uid);
                  window.location.href = "/home";
                  return {
                    ...state,
                    currentUser: user.user.uid,
                  };
                });
            } catch (e) {
              await auth.signOut();
              localStorage.clear();
              toast.error(e.message);
            }
          } else {
            await auth.signOut();
            localStorage.clear();
            toast.error("Usuário não existe ou não é um administrador");
          }
        });

    // case "CLEAR_ALL":
    //     return {
    //         transactions: [],
    //         ...storage([]),
    //     }
    default:
      return state;
  }
};
