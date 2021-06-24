import * as S from "./styled";
import Input from "../../atoms/Input";
import { useContext, useState } from "react";
import Button from "../../atoms/Button";
import * as Icon from "@material-ui/icons";
import GlobalStyle from "../../../styles/global";
import { EventContext } from "../../../contexts/Event/EventContext";
import * as Material from "@material-ui/core";
import GuestManager from "../../molecules/GuestManager";
import AlertModal from "../../atoms/AlertModal";

const EventCreator = ({ history }) => {
  const { eventInView, saveEvent, updateEvent, clearEventInView, loadEvents } =
    useContext(EventContext);
  const [objEvent, setObjEvent] = useState({ ...eventInView.data });
  const [isGuestManagerOpen, setIsGuestManagerOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleChange = (input) => {
    const { value } = input.target;

    setObjEvent({
      ...objEvent,
      [input.target.name]: value,
    });
  };

  const handleSwitch = (value) => {
    objEvent.is_live = value;
    setObjEvent({ ...objEvent });
  };

  const handleGuestManagerModal = () => {
    setIsGuestManagerOpen(!isGuestManagerOpen);
    setIsAlertOpen(false);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    reader.addEventListener(
      "load",
      async () => {
        objEvent.image = reader.result;
        setObjEvent({ ...objEvent });

        await createImage(objEvent.image).then((img) => {
          canvas.width = 250;
          canvas.height = 250;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            objEvent.blob = blob;
            setObjEvent({ ...objEvent });
          }, "image/jpeg");
        });
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const createImage = (url) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });
  };

  const sendEventObj = (event) => {
    event.preventDefault();
    handleAlertModal();
  };

  const handleAlertModal = () => {
    setIsAlertOpen(!isAlertOpen);
  };

  const handleSave = async (isSavingWithNoParticipants) => {
    if (Object.keys(eventInView).length !== 1) {
      await updateEvent({
        event: { id: eventInView.id, data: objEvent },
        updateStatus: false,
      });
    } else {
      await saveEvent({
        event: objEvent,
        hasParticipants: isSavingWithNoParticipants,
      }).then(() => {});
    }

    console.log(isSavingWithNoParticipants);
    if (isSavingWithNoParticipants) {
      handleGuestManagerModal();
    } else {
      setTimeout(() => {
        history.push("/eventos");
        //Implementar loading
      }, 3000);
    }
  };

  return (
    <S.Container>
      <GlobalStyle />

      <S.BackButton
        type={"button"}
        onClick={async () => {
          await clearEventInView();
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
              onChange={handleImage}
              required
            />
            {objEvent.image !== null ? (
              <>
                <S.Image src={objEvent.image} alt="Imagem do evento" />
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
        <S.VideoForm onSubmit={(event) => sendEventObj(event)}>
          <Input
            isFromLogin={false}
            type="text"
            onChange={handleChange}
            name="title"
            value={objEvent.title}
            placeholder="Digite o título do evento..."
            required={true}
          />

          <Input
            isFromLogin={false}
            type="text"
            onChange={handleChange}
            name="description"
            value={objEvent.description}
            placeholder="Digite a descrição do evento..."
            required={true}
          />

          <Input
            isFromLogin={false}
            type="date"
            onChange={handleChange}
            name="event_date"
            value={objEvent.event_date}
            required={true}
          />

          <S.FooterButtons>
            <S.SwitchButtonLive>
              <p>Online</p>
              <Material.Switch
                checked={objEvent.is_live}
                onChange={() => handleSwitch(!objEvent.is_live)}
                color="primary"
                name="is_live"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </S.SwitchButtonLive>
          </S.FooterButtons>

          <S.SubmitButton>
            {Object.keys(eventInView).length !== 0 ? (
              <Button
                backgroundColor="var(--color-white)"
                type="submit"
                width="40%"
                height="50px"
                name="submitButton"
                color="var(--color-yellow)"
                borderColor="var(--color-yellow)"
                text={"Editar evento"}
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
                text={"Salvar evento"}
              />
            )}
          </S.SubmitButton>
        </S.VideoForm>
      </S.Content>

      <GuestManager
        isOpen={isGuestManagerOpen}
        handleClose={handleGuestManagerModal}
        objEvent={objEvent}
        history={history}
      />

      <AlertModal
        handleOk={() => handleSave(true)}
        title={"Atenção"}
        description={"Gostaria de adicionar novos participantes?"}
        handleClose={() => handleSave(false)}
        optionOne={"Sim"}
        optionTwo={"Não"}
        isOpen={isAlertOpen}
      />
    </S.Container>
  );
};

export default EventCreator;
