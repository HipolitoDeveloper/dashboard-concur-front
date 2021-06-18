import * as Material from "@material-ui/core";
import * as S from "./styled";
import GlobalStyle from "../../../styles/global";
import Button from "../../atoms/Button";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useContext, useState } from "react";
import { db, storage } from "../../../services/firebase";
import PropTypes from "prop-types";
import ShowCaseHeader from "../ShowCaseHeader";
import { ShowCaseContext } from "../../../contexts/ShowCase/ShowCaseContext";
import { EventContext } from "../../../contexts/Event/EventContext";
import Input from "../../atoms/Input";
import * as Icon from "@material-ui/icons";

const GuestManager = ({ isOpen, handleClose }) => {
  const { eventInView, loadEvents } = useContext(EventContext);

  const [loading, setLoading] = useState(false); //Implementar loading
  const [participants, setParticipants] = useState([]);

  const addParticipant = () => {
    participants.push({
      image: "",
      name: "BBB",
      profession: "BB",
    });
    setTimeout(() => {
      setParticipants(participants);
      //Implementar loading
    }, 1000);

    setParticipants(participants);
  };

  const handleChange = (input, index) => {
    const { value } = input.target;

    const newParticipants = participants.map((participant, i) => {
      if (index === i) {
        participant = {
          ...participant,
          [input.target.name]: value,
        };
      }
      return participant;
    });

    setParticipants(newParticipants);
  };

  const handleImage = async (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const newParticipants = participants.map((participant, i) => {
      reader.addEventListener(
        "load",
        () => {
          if (index === i) {
            participant.image = reader.result;

            createImage(participant.image).then((img) => {
              canvas.width = 250;
              canvas.height = 250;

              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              canvas.toBlob((blob) => {
                participant.blob = blob;
              }, "image/jpeg");
            });
          }
        },
        false
      );
      return participant;
    });
    setParticipants(newParticipants);

    setTimeout(() => {
      setParticipants(participants);
      //Implementar loading
    }, 1000);

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

  const sendParticipants = async (event) => {
    event.preventDefault();
    console.log(participants);
    // if (Object.keys(eventInView).length !== 0) {
    //   updateEvent({
    //     event: { id: eventInView.id, data: objEvent },
    //     updateStatus: false,
    //   });
    //   setTimeout(() => {
    //     clearEventInView();
    //     history.push("/eventos");
    //     //Implementar loading
    //   }, 3000);
    // } else {
    //   handleGuestManagerModal();
    //   await saveEvent(objEvent).then(() => {
    //     setTimeout(() => {
    //       history.push("/eventos");
    //       //Implementar loading
    //     }, 3000);
    //   });
    // }
  };

  const renderParticipants = participants.map((participant, index) => (
    <S.ParticipantContent key={index}>
      <S.ImageSpot>
        <S.ImageContent>
          <S.ImageInput
            type="file"
            accept="image/*"
            id="fileElem"
            onChange={(e) => handleImage(e, index)}
            required
          />
          {participant.image !== "" ? (
            <>
              <S.Image src={participant.image} alt="Imagem de participantes" />
            </>
          ) : (
            <>
              <S.ImageIcon />
            </>
          )}
        </S.ImageContent>
      </S.ImageSpot>

      <Input
        isFromLogin={false}
        type="text"
        onChange={(value) => handleChange(value, index)}
        name="name"
        value={participant.name}
        placeholder="Digite o nome do participante..."
        required={true}
      />

      <Input
        isFromLogin={false}
        type="text"
        onChange={(value) => handleChange(value, index)}
        name="profession"
        value={participant.profession}
        placeholder="Digite o a profissão do participante..."
        required={true}
      />
    </S.ParticipantContent>
  ));

  return (
    <div>
      <Material.Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <S.Container>
          <GlobalStyle />
          <S.Content onSubmit={sendParticipants}>
            {renderParticipants}
            <S.AddParticipant onClick={addParticipant}>
              <Icon.Add style={{ color: "var(--color-white)" }} />
            </S.AddParticipant>
            <S.SubmitButtonContent>
              <Button
                backgroundColor="var(--color-yellow)"
                type="submit"
                width="200px"
                height="50px"
                name="submitButton"
                color="var(--color-white)"
                borderColor="var(--color-yellow)"
                text={"Salvar evento"}
              />
            </S.SubmitButtonContent>
          </S.Content>
        </S.Container>
      </Material.Modal>
    </div>
  );
};

export default GuestManager;

ShowCaseHeader.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  showToast: PropTypes.func,
};

ShowCaseHeader.defaultProps = {
  isOpen: false,
  handleClose: () => {},
  showToast: () => {},
};
