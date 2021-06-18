import { db } from "../../services/firebase";

export const getMessages = (collection, id) => {
  return new Promise(async (resolve) => {
    await db
      .collection(collection)
      .doc(id)
      .collection("messageCollection")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          let messages = [];
          querySnapshot.docs.forEach((snapshot) => {
            let message = {};
            message.id = snapshot.id;
            message.data = snapshot.data();
            messages.push(message);
          });
          resolve(messages);
        }
      });
  });
};

export const ChatReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_MESSAGES":
      state.messages = action.messages;
      return {
        ...state,
        messages: state.messages,
      };

    default:
      return state;
  }
};
