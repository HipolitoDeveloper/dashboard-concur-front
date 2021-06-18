import { db } from "../../services/firebase";
import { setStorage } from "../Blog/BlogReducer";

export const getTags = async () => {
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
        storage(tags);
      }
    });
};

export const storage = (tags) => {
  localStorage.setItem("tags", JSON.stringify(tags));
};

export const TagsReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_TAGS":
      state.tags = JSON.parse(localStorage.getItem("tags"));
      return {
        ...state,
        tags: state.tags,
      };
    case "ADD_TAG":
      const tag = action.payload;
      tag.active = true;

      db.collection("tagsColleciton")
        .add(tag)
        .then((id) => {
          state.tags.push({ id: id.id, data: tag });
          storage(state.tags);
        });

      return {
        ...state,
        tags: state.tags,
      };
    default:
      return state;
  }
};
