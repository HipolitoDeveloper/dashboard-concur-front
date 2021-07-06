import axios from "axios";

export const vimeo = axios.create({
  baseURL: `${process.env.REACT_APP_VIMEO_API_URL}`,
});

// export const vimeoPatch = axios.patch({
//   baseURL: `${process.env.REACT_APP_VIMEO_API_URL}`,
// });

export const configHeader = {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_VIMEO_ACESS_TOKEN}`,
  },
};

export const uploadVideoHeader = {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_VIMEO_ACESS_TOKEN}`,
    "Tus-Resumable": "1.0.0",
    "Upload-Offset": 0,
    "Content-Type": "application/offset+octet-stream",
    Accept: "application/vnd.vimeo.*+json;version=3.4",
  },
};

export const createVideoHeader = {
  headers: {
    Authorization: `Bearer 9b65fd6bbd4c1ccae3d23ed04c89af17`,
  },
};

export function vimeoId(url) {
  // var regExp = /http:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
  const regExp =
    /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
  const match = url.match(regExp);
  return match && match[5] ? match[5] : false;
}

export const getVimeoVideos = async () => {
  const {
    data: { data },
  } = await vimeo.get("users/sapconcurcontent/videos", configHeader);
  return data;
};

export const getTags = async () => {
  const {
    data: { data },
  } = await vimeo.get(
    "users/sapconcurcontent/videos?fields=tags",
    configHeader
  );
  return data;
};

export const addTagToVideo = async (videoId, tag) => {
  await vimeo.put(`videos/${videoId}/tags/${tag}`, null, createVideoHeader);
};

export const deleteVideoFromVimeo = async (videoId) => {
  await vimeo.delete(`videos/${videoId}`, createVideoHeader);
};

export const postVideo = async (value, videoDetails) => {
  const reader = new FileReader();
  const { name, description } = videoDetails;
  const fileSize = value.target.files[0].size;
  let videoId = "";
  const data = {
    upload: {
      approach: "tus",
      size: `${fileSize}`,
    },
    name: name,
    description: description,
  };

  return new Promise(async (resolve) => {
    await vimeo
      .post(`/me/videos`, data, createVideoHeader)
      .then((res) => {
        const upload_link = res.data.upload.upload_link;
        reader.onload = async (r) => {
          const binaryData = r.target.result;
          await vimeo.patch(upload_link, binaryData, uploadVideoHeader);
        };
        reader.readAsArrayBuffer(value.target.files[0]);
        const videoID = vimeoId(res.data.link);
        resolve(videoID);
      })
      .catch((error) => {
        // eslint-disable-next-line no-alert
        alert(`${error}`);
      });
  });
};
