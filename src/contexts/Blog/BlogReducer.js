import { db, storage } from "../../services/firebase";
import { v4 as uuidv4 } from "uuid";

export const getPosts = async () => {
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

export const setStorage = (posts) => {
  localStorage.setItem("posts", JSON.stringify(posts));
};

export const BlogReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_POST":
      let postToUpdate = {};
      state.posts.forEach((post) => {
        if (action.payload.post.id === post.id) {
          if (action.payload.updateStatus)
            post.data.active = !action.payload.post.data.active;
          else post.data = { ...action.payload.post.data };
          postToUpdate = post;
        }
      });

      postToUpdate.data.updateAt = new Date();
      db.collection("blogCollection")
        .doc(postToUpdate.id)
        .update({ ...postToUpdate.data })
        .then(() => {})
        .catch((e) => {
          alert("Tratar erro não foi possível alterar o post");
        });
      return {
        ...state,
        posts: state.posts,
      };
    case "LOAD_POSTS":
      state.posts = JSON.parse(localStorage.getItem("posts"));
      return {
        ...state,
        posts: state.posts,
      };
    case "SAVE_POST":
      const post = action.payload;
      const blob = action.payload.blob;
      const userFileNameImage = `images/${uuidv4()}-${blob.image}`;
      post.active = true;
      post.createdDate = new Date();
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
                if (state.posts === null) {
                  state.posts = [];
                  state.posts.push({ id: id.id, data: post });
                } else {
                  state.posts.push({ id: id.id, data: post });
                }

                setStorage(state.posts);
              });
          });
        }
      );

      return {
        ...state,
        posts: state.posts,
      };
    case "SET_POSTINVIEW":
      const postInView = action.payload;
      return {
        ...state,
        postInView: postInView,
      };

    case "DELETE_POST":
      db.collection("blogCollection")
        .doc(action.payload.id)
        .delete()
        .then(() => {
          state.posts.forEach((image, index) => {
            if (image.id === action.payload.id) {
              state.posts.splice(index, 1);
              setStorage(state.posts);
            }
          });
        })
        .catch((error) => {
          console.log(error);
          alert("Tratar erro delete blog");
        });
      return {
        ...state,
        posts: state.posts,
      };

    case "CLEAR_POSTINVIEW":
      state.postInView = {};
      return {
        ...state,
        postInView: state.postInView,
      };
    default:
      return state;
  }
};
