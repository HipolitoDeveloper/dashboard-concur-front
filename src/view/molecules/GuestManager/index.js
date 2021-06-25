import * as Material from "@material-ui/core";
import * as S from "./styled";
import GlobalStyle from "../../../styles/global";
import Button from "../../atoms/Button";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ShowCaseHeader from "../ShowCaseHeader";
import { EventContext } from "../../../contexts/Event/EventContext";
import Input from "../../atoms/Input";
import * as Icon from "@material-ui/icons";
import AlertModal from "../../atoms/AlertModal";
import { EditButton } from "./styled";

const errorMessages = [
  {
    type: "INCOMPLETE_PARTICIPANT",
    message: "Nem todas as informações foram adicionadas no participante",
  },
  {
    type: "DIFFERENT_PARTICIPANT",
    message: "Um participante foi editado, favor salvar as alterações",
  },
]; //Transformar em TOAST

const GuestManager = ({ isOpen, handleClose, history, objEvent }) => {
  const {
    eventInView,
    loadEvents,
    saveParticipant,
    clearEventInView,
    addParticipant,
    deleteParticipant,
    handleChangeParticipant,
    editParticipant,
    fixEvent,
  } = useContext(EventContext);

  const [loading, setLoading] = useState(false); //Implementar loading
  const [isConfirmationAlertOpen, setIsConfirmationAlertOpen] = useState(false);

  const verifyParticipant = () => {
    let messageToReturn = "";
    let isNotAbleToContinue = true;

    if (
      eventInView.data.participants.some(
        (participant) =>
          participant.data.image === "" ||
          participant.data.title === "" ||
          participant.data.profession === ""
      )
    ) {
      isNotAbleToContinue = false;
      messageToReturn = errorMessages.find(
        (message) => message.type === "INCOMPLETE_PARTICIPANT"
      ).message;
    } else if (
      eventInView.data.participants.some(
        (participant) => participant.data.is_original === false
      )
    ) {
      isNotAbleToContinue = false;
      messageToReturn = errorMessages.find(
        (message) => message.type === "DIFFERENT_PARTICIPANT"
      ).message;
    }

    return { messageToReturn, isNotAbleToContinue };
  };

  const handleAlertModal = (isClosing) => {
    const participant =
      eventInView.data.participants[eventInView.data.participants.length - 1];

    if (isClosing) {
      setIsConfirmationAlertOpen(!isConfirmationAlertOpen);
      return;
    }

    const { messageToReturn, isNotAbleToContinue } = verifyParticipant();

    if (isNotAbleToContinue) {
      if (eventInView.data.participants.length === 0 && isNotAbleToContinue) {
        setIsConfirmationAlertOpen(!isConfirmationAlertOpen);
        return;
      }

      if (participant.blob === undefined && isNotAbleToContinue) {
        setIsConfirmationAlertOpen(!isConfirmationAlertOpen);
        return;
      }
      saveParticipant({
        participant: participant.data,
        participantBlob: participant.blob,
      });
      setIsConfirmationAlertOpen(!isConfirmationAlertOpen);
    } else {
      alert(messageToReturn);
    }
  };

  const addNewParticipant = () => {
    addParticipant();
    handleAlertModal(true);
  };

  const finishEventCreation = () => {
    const { messageToReturn, isNotAbleToContinue } = verifyParticipant();
    const participant =
      eventInView.data.participants[eventInView.data.participants.length - 1];

    if (isNotAbleToContinue) {
      if (participant.blob !== undefined) {
        saveParticipant({
          participant: participant.data,
          participantBlob: participant.blob,
        });
      }
      fixEvent();

      setTimeout(() => {
        history.push("/eventos");
        clearEventInView();
        //Implementar loading
      }, 3000);
    } else {
      alert(messageToReturn);
    }
  };

  const renderParticipants = eventInView?.data?.participants.map(
    (participant, index) => (
      <S.ParticipantContent key={index}>
        {!participant.data?.is_original && (
          <S.EditButton
            type={"button"}
            onClick={() => editParticipant(participant)}
          >
            <Icon.Edit />
          </S.EditButton>
        )}
        <S.DeleteButton
          type={"button"}
          onClick={() =>
            deleteParticipant({ index: index, id: participant.id })
          }
        >
          <Icon.Delete style={{ color: "var(--color-white)" }} />
        </S.DeleteButton>
        <S.ImageSpot>
          <S.ImageContent>
            <S.ImageInput
              type="file"
              accept="image/*"
              id="fileElem"
              onChange={(e) => {
                handleChangeParticipant({
                  e: e,
                  participantToChangeIndex: index,
                  isImageChanging: true,
                });
                loadEvents();
              }}
              required
            />
            {participant?.data?.image !== "" ? (
              <>
                <S.Image
                  src={participant?.data?.image}
                  alt="Imagem de participantes"
                />
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
          onChange={(value) =>
            handleChangeParticipant({
              input: value,
              participantToChangeIndex: index,
              isImageChanging: false,
            })
          }
          name="name"
          value={participant.data.name}
          placeholder="Digite o nome do participante..."
          required={true}
        />

        <Input
          isFromLogin={false}
          type="text"
          onChange={(value) =>
            handleChangeParticipant({
              input: value,
              participantToChangeIndex: index,
              isImageChanging: false,
            })
          }
          name="profession"
          value={participant.data.profession}
          placeholder="Digite o a profissão do participante..."
          required={true}
        />
      </S.ParticipantContent>
    )
  );

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
          <S.Content>
            <S.ParticipantContainer>
              {renderParticipants}
              <S.AddParticipant
                type={"button"}
                onClick={() => handleAlertModal()}
              >
                <Icon.Add style={{ color: "var(--color-white)" }} />
              </S.AddParticipant>
            </S.ParticipantContainer>

            <S.SubmitButtonContent>
              <Button
                onClick={() => finishEventCreation()}
                backgroundColor="var(--color-yellow)"
                type="button"
                width="200px"
                height="50px"
                name="submitButton"
                color="var(--color-white)"
                borderColor="var(--color-yellow)"
                text={"Salvar evento"}
              />
            </S.SubmitButtonContent>
          </S.Content>
          <AlertModal
            handleOk={() => addNewParticipant()}
            title={"Atenção"}
            description={
              "Gostaria de adicionar mais um participante ou continuar editando o anterior?"
            }
            handleClose={() => handleAlertModal(true)}
            isOpen={isConfirmationAlertOpen}
            optionOne={"Adicionar"}
            optionTwo={"Fechar"}
          />
        </S.Container>
      </Material.Modal>
    </div>
  );
};

export default GuestManager;

ShowCaseHeader.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  handleThree: PropTypes.func,
  showToast: PropTypes.func,
};

ShowCaseHeader.defaultProps = {
  isOpen: false,
  handleClose: () => {},
  showToast: () => {},
  handleThree: () => {},
};
