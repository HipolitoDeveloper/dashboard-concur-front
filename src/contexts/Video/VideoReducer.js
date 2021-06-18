import { db } from "../../services/firebase";
import { setStorage } from "../Blog/BlogReducer";

export const getVideos = async () => {
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
      let videoToUpdate = {};
      state.videos.forEach((video, i) => {
        if (action.payload.video.id === video.id) {
          if (action.payload.updateStatus)
            video.data.active = !action.payload.video.data.active;
          else video.data = { ...action.payload.video.data };

          videoToUpdate = video;
        }
      });

      videoToUpdate.data.updateAt = new Date();

      db.collection("videosCollection")
        .doc(videoToUpdate.id)
        .update({ ...videoToUpdate.data })
        .then(() => {})
        .catch((e) => {
          alert("Tratar erro não foi possível alterar o post");
        });
      return {
        ...state,
        videos: state.videos,
      };
    case "LOAD_VIDEO":
      state.videos = JSON.parse(localStorage.getItem("videos"));

      return {
        ...state,
        videos: state.videos,
      };
    case "SAVE_VIDEO":
      const video = action.payload;
      video.is_available = true;
      video.type = "video";
      video.createdDate = new Date();

      db.collection("videosCollection")
        .add(video)
        .then((id) => {
          state.videos.push({ id: id.id, data: video });
          storage(state.videos);
        });

      return {
        ...state,
        videos: state.videos,
      };
    case "SET_VIDEOINVIEW":
      const videoInView = action.payload;
      localStorage.setItem("videoInView", JSON.stringify(videoInView));
      return {
        ...state,
        videoInView: videoInView,
      };

    case "DELETE_VIDEO":
      db.collection("videosCollection")
        .doc(action.payload.id)
        .delete()
        .then(() => {
          state.videos.forEach((image, index) => {
            if (image.id === action.payload.id) {
              state.videos.splice(index, 1);
              setStorage(state.videos);
            }
          });
        })
        .catch((error) => {
          console.log(error);
          alert("Tratar erro delete vídeo");
        });
      return {
        ...state,
        videos: state.videos,
      };

    case "CLEAR_VIDEOINVIEW":
      localStorage.setItem("videoInView", []);
      state.videoInView = [];
      return {
        ...state,
        videoInView: state.videoInView,
      };
    default:
      return state;
  }
};
