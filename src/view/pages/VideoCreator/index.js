import * as S from "./styled";
import Input from "../../atoms/Input";
import { useContext, useEffect, useState } from "react";
import Button from "../../atoms/Button";
import * as Icon from "@material-ui/icons";
import { VideoContext } from "../../../contexts/Video/VideoContext";
import { TagsContext } from "../../../contexts/Tags/TagsContext";
import Select from "react-select";
import { DropdownContent } from "./styled";
import GlobalStyle from "../../../styles/global";

import {
  addTagToVideo,
  getVimeoVideos,
  postVideo,
  vimeoId,
} from "../../../services/vimeo";
import { NavLink, Redirect } from "react-router-dom";

const VideoCreator = ({ history }) => {
  const { videoInView, saveVideo, updateVideo, clearVideoInView } =
    useContext(VideoContext);
  const { loadTags, tags } = useContext(TagsContext);
  const [inputVideo, setInpuVideo] = useState(null);
  const [objVideo, setObjVideo] = useState({ ...videoInView.data });

  useEffect(() => {
    const getTags = async () => {
      await loadTags();
    };
    getTags();
  }, []);

  const handleChange = (input, isTag) => {
    if (!isTag) {
      const { value } = input.target;

      setObjVideo({
        ...objVideo,
        [input.target.name]: value,
      });
    } else {
      objVideo.tag = input;
      setObjVideo({ ...objVideo });
    }
  };

  const handleVideo = (input) => {
    setInpuVideo(input);
  };

  const sendVideoObj = async (event) => {
    event.preventDefault();
    if (Object.keys(videoInView).length !== 0) {
      updateVideo({
        video: { id: videoInView.id, data: objVideo },
        updateStatus: false,
      });

      getVimeoVideos().then((videosFromVimeo) => {
        let vimeoVideos = videosFromVimeo.map((vimeo) => {
          vimeo.link = vimeoId(vimeo.link);
          return vimeo;
        });
        vimeoVideos.forEach((video) => {
          if (video.link === videoInView.data.videoUrl) {
            if (!video.tags.some((tag) => tag.name === objVideo.tag.value)) {
              addTagToVideo(videoInView.data.videoUrl, objVideo.tag.value);
            }
          }
        });
      });

      setTimeout(() => {
        clearVideoInView();
        history.push("/videos");
        //Implementar loading
      }, 3000);
    } else {
      await postVideo(inputVideo, {
        name: objVideo.name,
        description: objVideo.description,
      }).then(async (videoId) => {
        await addTagToVideo(videoId, objVideo.tag.value);
        objVideo.videoUrl = videoId;
        await saveVideo(objVideo).then(() => {
          setTimeout(() => {
            history.push("/videos");
            //Implementar loading
          }, 3000);
        });
      });
    }
  };

  return (
    <S.Container>
      <GlobalStyle />
      <S.BackButton
        type={"button"}
        onClick={() => {
          clearVideoInView();
          history.push("/videos");
        }}
      >
        <Icon.ArrowBack style={{ color: "var(--color-black)", fontSize: 30 }} />
      </S.BackButton>
      <S.Content>
        <S.ImageSpot>
          <S.ImageContent>
            <S.ImageInput
              type="file"
              accept="video/*"
              id="fileElem"
              onChange={handleVideo}
              required
            />
            {inputVideo !== null ? (
              <>
                <S.Image src={inputVideo.target.value} alt="Video" />
              </>
            ) : (
              <>
                <Icon.CloudUpload
                  style={{ color: "var(--color-yellow)", fontSize: 60 }}
                />
              </>
            )}
          </S.ImageContent>
        </S.ImageSpot>
        {Object.keys(videoInView).length !== 0 && (
          <S.WarningMessage>
            Não é possível atualizar o vídeo. Caso seja necessário, crie um novo{" "}
            <NavLink
              to="/video/criador"
              onClick={() => {
                clearVideoInView();
                setObjVideo({});
              }}
            >
              aqui.
            </NavLink>
          </S.WarningMessage>
        )}
        <S.VideoForm onSubmit={(event) => sendVideoObj(event)}>
          <Input
            isFromLogin={false}
            type="text"
            onChange={handleChange}
            name="name"
            value={objVideo.name}
            placeholder="Digite o título do vídeo..."
            required={true}
          />

          <Input
            isFromLogin={false}
            type="text"
            onChange={handleChange}
            name="description"
            value={objVideo.description}
            placeholder="Digite a descrição do vídeo..."
            required={true}
          />

          <DropdownContent>
            <Select
              onChange={(value) => handleChange(value, true)}
              name="tag"
              value={objVideo.tag}
              options={tags}
              placeholder={"Escolha sua tag..."}
            />
          </DropdownContent>

          <S.SubmitButton>
            {Object.keys(videoInView).length !== 0 ? (
              <Button
                backgroundColor="var(--color-white)"
                type="submit"
                width="40%"
                height="50px"
                name="submitButton"
                color="var(--color-yellow)"
                borderColor="var(--color-yellow)"
                text={"Editar vídeo"}
              />
            ) : (
              <Button
                backgroundColor="var(--color-white)"
                type="submit"
                width="40%"
                height="50px"
                name="submitButton"
                color="var(--color-yellow)"
                borderColor="var(--color-yellow)"
                text={"Salvar video"}
              />
            )}
          </S.SubmitButton>
        </S.VideoForm>
      </S.Content>
    </S.Container>
  );
};

export default VideoCreator;
