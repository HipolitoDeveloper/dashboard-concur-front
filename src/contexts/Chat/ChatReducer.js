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
      })
      .catch((e) => {
        console.log(e);
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
    case "DELETE_MESSAGE":
      const { messageId, inViewId, collection } = action.payload;
      db.collection(collection)
        .doc(inViewId)
        .collection("messageCollection")
        .doc(messageId)
        .delete()
        .then(() => {})
        .catch((error) => {
          console.log(error);
          alert("Tratar erro delete message");
        });

      state.messages.forEach((message, index) => {
        if (message.id === messageId) {
          state.messages.splice(index, 1);
        }
      });
      return {
        ...state,
        messages: state.messages,
      };

    default:
      return state;
  }
};
