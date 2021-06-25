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
    Authorization: `Bearer ${process.env.REACT_APP_VIMEO_ACESS_TOKEN}`,
    "Content-Type": "application/json",
    Accept: "application/vnd.vimeo.*+json;version=3.4",
  },
};

export const getVideos = async () => {
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

export const postVideo = async (video) => {
  const { url, size } = video;
  const data = {
    upload: {
      approach: "tus",
      size: `${size}`,
    },
  };

  await vimeo
    .post(`/me/videos`, data, createVideoHeader)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      // eslint-disable-next-line no-alert
      alert(`${error}`);
    });

  return data;
};
