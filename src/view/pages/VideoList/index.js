import * as S from "./styled";
import { useContext, useEffect, useState } from "react";
import { VideoContext } from "../../../contexts/Video/VideoContext";

import * as Material from "@material-ui/core";
import * as Icon from "@material-ui/icons";

const HeaderItems = [
  { nome: "Vídeo" },
  { nome: "TÍTULO" },
  { nome: "CHAT" },
  { nome: "DISPONIBILIDADE" },
  { nome: "EDITAR" },
];

const VideoList = () => {
  const { videos, loadVideos, updateVideo } = useContext(VideoContext);
  const [videosList, setVideoList] = useState(videos);

  useEffect(() => {
    loadVideos();
  }, []);

  const handleChange = (index) => {
    const newVideoList = videosList.map((video, i) => {
      if (index === i) {
        video.data.is_available = !video.data.is_available;
        updateVideo(video);
      }
      return video;
    });
    setVideoList(newVideoList);
  };

  const renderHeader = HeaderItems.map((item) => (
    <Material.TableCell key={item.nome}>
      <S.HeaderTitle>{item.nome}</S.HeaderTitle>
    </Material.TableCell>
  ));

  const renderVideos = videosList?.map((video, index) => (
    <Material.TableRow key={video?.id}>
      <Material.TableCell component="th" scope="row">
        <S.ThumbnailContent></S.ThumbnailContent>
      </Material.TableCell>
      <Material.TableCell component="th" scope="row">
        <S.Title>{video?.data?.name}</S.Title>
      </Material.TableCell>
      <Material.TableCell component="th" scope="row">
        <S.ChatIcon>
          {" "}
          <Icon.Chat style={{ color: "var(--color-yellow)" }} />
        </S.ChatIcon>
      </Material.TableCell>
      <Material.TableCell component="th" scope="row">
        <Material.Switch
          checked={video?.data?.is_available}
          onChange={() => handleChange(index)}
          color="primary"
          name="isAvailable"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </Material.TableCell>
      <Material.TableCell component="th" scope="row">
        <S.EditIcon>
          {" "}
          <Icon.Edit style={{ color: "var(--color-yellow)" }} />
        </S.EditIcon>
      </Material.TableCell>
    </Material.TableRow>
  ));

  return (
    <S.Container>
      <S.Content>
        <Material.Table>
          <Material.TableHead>
            <Material.TableRow>{renderHeader}</Material.TableRow>
          </Material.TableHead>
          <Material.TableBody>{renderVideos}</Material.TableBody>
        </Material.Table>
      </S.Content>
    </S.Container>
  );
};

export default VideoList;
