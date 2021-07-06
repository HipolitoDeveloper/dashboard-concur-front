import { db } from "../../services/firebase";
import {
  deleteVideo,
  getVimeoVideos,
  postVideo,
  vimeoId,
} from "../../services/vimeo";

export const getVideos = async () => {
  return new Promise(async (resolve) => {
    getVimeoVideos().then((videosFromVimeo) => {
      let vimeoVideos = videosFromVimeo.map((vimeo) => {
        vimeo.link = vimeoId(vimeo.link);

        return vimeo;
      });

      db.collection("videosCollection")
        .get()
        .then(async (querySnapshot) => {
          if (querySnapshot.docs.length > 0) {
            let videos = [];

            querySnapshot.docs.forEach((snapshot) => {
              let video = { data: {} };
              vimeoVideos.forEach((vimeoVideo) => {
                if (vimeoVideo.link === snapshot.data().videoUrl) {
                  video.image = vimeoVideo.pictures.sizes[3].link;
                }
              });
              video.data = snapshot.data();
              video.id = snapshot.id;
              videos.push(video);
            });

            resolve(videos);
          }
        });
    });
  });
};

export const VideosReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_VIDEO":
      let videoToUpdate = {};
      state.videos.forEach((video, i) => {
        if (action.payload.video.id === video.id) {
          if (action.payload.updateStatus)
            video.data.is_available = !action.payload.video.data.is_available;
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
      state.videos = action.videos;

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
          if (state.videos === null) {
            state.videos = [];
            state.videos.push({ id: id.id, data: video });
          } else {
            state.videos.push({ id: id.id, data: video });
          }
        });

      return {
        ...state,
        videos: state.videos,
      };
    case "SET_VIDEOINVIEW":
      const videoInView = action.payload;
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
      state.videoInView = {};
      return {
        ...state,
        videoInView: state.videoInView,
      };
    default:
      return state;
  }
};
