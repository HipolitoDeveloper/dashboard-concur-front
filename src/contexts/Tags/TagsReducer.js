import { db } from "../../services/firebase";
import { setStorage } from "../Blog/BlogReducer";

export const getTags = async () => {
  return new Promise(async (resolve) => {
    await db
      .collection("tagsCollection")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          let tags = [];
          querySnapshot.docs.forEach((snapshot) => {
            let tag = {};
            tag.value = snapshot.data().name;
            tag.label = snapshot.data().name;
            tags.push(tag);
          });
          resolve(tags);
        } else {
          resolve([]);
        }
      });
  });
};

export const TagsReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_TAGS":
      state.tags = action.tags;
      return {
        ...state,
        tags: state.tags,
      };
    case "ADD_TAG":
      const tag = action.payload;
      tag.active = true;

      db.collection("tagsCollection")
        .add(tag)
        .then((id) => {
          state.tags.push({ id: id.id, data: tag });
        });

      return {
        ...state,
        tags: state.tags,
      };
    default:
      return state;
  }
};
