import * as S from "./styled";
import { useContext, useEffect, useState } from "react";
import { TagsContext } from "../../../contexts/Tags/TagsContext";

import * as Material from "@material-ui/core";
import * as Icon from "@material-ui/icons";
import { VideoContext } from "../../../contexts/Video/VideoContext";
import ChatModal from "../../molecules/ChatModal";
import { ChatContext } from "../../../contexts/Chat/ChatContext";

const HeaderItems = [
  { nome: "Vídeo" },
  { nome: "TÍTULO" },
  { nome: "CHAT" },
  { nome: "DISPONIBILIDADE" },
  { nome: "EDITAR" },
];

const VideoList = ({ history }) => {
  const {
    videos,
    loadVideos,
    updateVideo,
    setVideoInView,
    deleteVideo,
    videoInView,
  } = useContext(VideoContext);

  const { loadMessages } = useContext(ChatContext);

  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  useEffect(() => {
    const getVideos = async () => {
      await loadVideos();
    };
    getVideos();
  }, []);

  const handleChange = (video) => {
    updateVideo({ video: video, updateStatus: true });
  };

  const handleEdit = async (video) => {
    await setVideoInView(video);
    history.push("/video/criador");
  };

  const handleDelete = async (video) => {
    await deleteVideo(video);

    setTimeout(() => {
      loadVideos();
      //Implementar loading
    }, 1000);
  };

  const handleChatModal = async (video) => {
    if (video.type !== "click") {
      await setVideoInView(video);
      await loadMessages({ collection: "videosCollection", id: video.id });
    }

    setIsChatModalOpen(!isChatModalOpen);
  };

  const renderHeader = HeaderItems.map((item) => (
    <Material.TableCell key={item.nome}>
      <S.HeaderTitle>{item.nome}</S.HeaderTitle>
    </Material.TableCell>
  ));

  const renderVideos = videos?.map((video, index) => (
    <Material.TableRow key={video?.id}>
      <Material.TableCell component="th" scope="row">
        <S.DeleteButton type={"button"} onClick={() => handleDelete(video)}>
          <Icon.Delete style={{ color: "var(--color-white)", fontSize: 25 }} />
        </S.DeleteButton>
        <S.ThumbnailContent>
          {video?.data?.image === undefined ? (
            <S.ImageSpot />
          ) : (
            <S.Image src={video?.data?.image} alt="Imagem do post" />
          )}
        </S.ThumbnailContent>
      </Material.TableCell>
      <Material.TableCell component="th" scope="row">
        <S.Title>{video?.data?.name}</S.Title>
      </Material.TableCell>
      <Material.TableCell component="th" scope="row">
        <S.ChatIcon onClick={() => handleChatModal(video)}>
          <Icon.Chat style={{ color: "var(--color-yellow)" }} />
        </S.ChatIcon>
      </Material.TableCell>
      <Material.TableCell component="th" scope="row">
        <Material.Switch
          checked={video?.data?.is_available}
          onChange={() => handleChange(video)}
          color="primary"
          name="isAvailable"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </Material.TableCell>
      <Material.TableCell component="th" scope="row">
        <S.EditIcon onClick={() => handleEdit(video)}>
          <Icon.Edit style={{ color: "var(--color-yellow)" }} />
        </S.EditIcon>
      </Material.TableCell>
    </Material.TableRow>
  ));

  return (
    <S.Container>
      <S.Content>
        <Material.Table stickyHeader>
          <Material.TableHead>
            <Material.TableRow>{renderHeader}</Material.TableRow>
          </Material.TableHead>

          <Material.TableBody>{renderVideos}</Material.TableBody>
        </Material.Table>
      </S.Content>
      <S.FabButton>
        <Material.Fab
          aria-label="add"
          style={{ backgroundColor: "var(--color-yellow" }}
          onClick={() => history.push("/video/criador")}
        >
          <Icon.Add style={{ color: "var(--color-white" }} />
        </Material.Fab>
      </S.FabButton>

      <ChatModal isOpen={isChatModalOpen} handleClose={handleChatModal} />
    </S.Container>
  );
};

export default VideoList;
