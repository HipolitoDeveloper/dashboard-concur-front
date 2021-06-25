import * as Material from "@material-ui/core";
import * as S from "./styled";
import * as Icon from "@material-ui/icons";

import GlobalStyle from "../../../styles/global";
import PropTypes from "prop-types";
import { ChatContext } from "../../../contexts/Chat/ChatContext";
import { useContext, useEffect, useReducer } from "react";
import { VideoContext } from "../../../contexts/Video/VideoContext";

const ChatModal = ({ isOpen, handleClose, inViewId, isFromEvent }) => {
  const { messages, deleteMessage } = useContext(ChatContext);

  const verifyDelete = (message) => {
    const collection = isFromEvent ? "eventsCollection" : "videosCollection";

    deleteMessage({
      messageId: message.id,
      inViewId: inViewId,
      collection: collection,
    });
  };

  const renderMessages = messages.map((message, index) => (
    <S.RenderContainer key={index}>
      <S.ChatContainer>
        <S.ChatUserImage>
          {message.data.userImage !== "default" ? (
            <S.Image src={message.data.userImage} alt="Imagem do usuário" />
          ) : (
            <S.UserMenu />
          )}
        </S.ChatUserImage>
        <S.ChatContent>
          <S.ChatHeader>{message.data.sentBy} </S.ChatHeader>
          <S.ChatMessage>{message.data.comment}</S.ChatMessage>
        </S.ChatContent>
        <S.ChatDeleteButton
          type={"button"}
          onClick={() => verifyDelete(message)}
        >
          <Icon.Delete />
        </S.ChatDeleteButton>
      </S.ChatContainer>
      <S.LineContainer />
    </S.RenderContainer>
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
          <S.Content>{renderMessages}</S.Content>
        </S.Container>
      </Material.Modal>
    </div>
  );
};

export default ChatModal;

ChatModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  collection: PropTypes.string,
  inViewId: PropTypes.string,
  isFromEvent: PropTypes.bool,
};

ChatModal.defaultProps = {
  isOpen: false,
  handleClose: () => {},
  collection: "",
  inViewId: "",
  isFromEvent: false,
};
