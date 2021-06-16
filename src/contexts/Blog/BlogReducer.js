import { db, storage } from "../../services/firebase";
import { v4 as uuidv4 } from "uuid";

export const getPosts = async (collection) => {
  await db
    .collection("blogCollection")
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.docs.length > 0) {
        let posts = [];
        querySnapshot.docs.forEach((snapshot) => {
          let post = {};
          post.data = snapshot.data();
          post.id = snapshot.id;
          posts.push(post);
        });
        setStorage(posts);
      }
    });
};

export const setStorage = (videos) => {
  localStorage.setItem("posts", JSON.stringify(videos));
};

export const BlogReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_POST":
      console.log(action);
      db.collection("blogCollection")
        .doc(action.payload.id)
        .update({ ...action.payload.data })
        .then(() => {})
        .catch((e) => {
          alert("ERRO", "Não foi possível salvar a alteração no video");
        });
      return {
        ...state,
        posts: state.posts,
      };
    case "LOAD_POSTS":
      return {
        posts: state.posts,
      };
    case "SAVE_POST":
      const post = action.payload;
      const blob = action.payload.blob;
      const userFileNameImage = `images/${uuidv4()}-${blob.image}`;
      post.active = true;
      delete post.blob;

      const uploadTask = storage
        .ref()
        .child(userFileNameImage)
        .put(blob, { contentType: blob.type });

      uploadTask.on(
        "state_changed",
        () => {},
        () => {},
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            post.image = downloadURL;
            db.collection("blogCollection")
              .add(post)
              .then((id) => {
                state.posts.push({ id: id.id, data: post });
              });
          });
        }
      );
      return {
        ...state,
        posts: state.posts,
      };

    // case "CLEAR_ALL":
    //     return {
    //         transactions: [],
    //         ...storage([]),
    //     }
    default:
      return state;
  }
};
