import { db } from "../../services/firebase";

export const getVideos = async (collection) => {
  await db
    .collection("videosCollection")
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.docs.length > 0) {
        let videos = [];
        querySnapshot.docs.forEach((snapshot) => {
          let video = {};
          video.data = snapshot.data();
          video.id = snapshot.id;
          videos.push(video);
        });
        storage(videos);
      }
    });
};

export const storage = (videos) => {
  localStorage.setItem("videos", JSON.stringify(videos));
};

export const VideosReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_VIDEO":
      console.log(action);
      db.collection("videosCollection")
        .doc(action.payload.id)
        .update({ ...action.payload.data })
        .then(() => {})
        .catch((e) => {
          alert("Tratar erro update video");
        });
      return {
        ...state,
        videos: state.videos,
      };
    case "LOAD_VIDEO":
      return {
        videos: state.videos,
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
