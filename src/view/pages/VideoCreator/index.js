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

const VideoCreator = ({ history }) => {
  const { videoInView, saveVideo, updateVideo, clearVideoInView } =
    useContext(VideoContext);
  const { loadTags, tags } = useContext(TagsContext);

  const [objVideo, setObjVideo] = useState({ ...videoInView.data });

  useEffect(() => {
    const getTags = async () => {
      await loadTags();
    };
    getTags();
  }, []);

  const handleChange = (input) => {
    const { value } = input.target;

    setObjVideo({
      ...objVideo,
      [input.target.name]: value,
    });
  };

  const sendVideoObj = async (event) => {
    event.preventDefault();
    if (Object.keys(videoInView).length !== 0) {
      updateVideo({
        video: { id: videoInView.id, data: objVideo },
        updateStatus: false,
      });
      setTimeout(() => {
        clearVideoInView();
        history.push("/videos");
        //Implementar loading
      }, 3000);
    } else {
      await saveVideo(objVideo).then(() => {
        setTimeout(() => {
          history.push("/videos");
          //Implementar loading
        }, 3000);
      });
    }
  };

  return (
    <S.Container>
      <GlobalStyle />
      <S.BackButton
        type={"button"}
        onClick={async () => {
          await clearVideoInView();
          history.goBack();
        }}
      >
        <Icon.ArrowBack style={{ color: "var(--color-black)", fontSize: 30 }} />
      </S.BackButton>
      <S.Content>
        <S.ImageSpot>
          <S.ImageContent>
            <S.ImageInput
              type="file"
              accept="image/*"
              id="fileElem"
              // onChange={handleImage}
              required
            />
            {objVideo.image !== null ? (
              <>
                <S.Image src={objVideo.image} alt="Video" />
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
