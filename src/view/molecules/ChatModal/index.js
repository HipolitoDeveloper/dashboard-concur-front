import * as Material from "@material-ui/core";
import * as S from "./styled";
import GlobalStyle from "../../../styles/global";
import PropTypes from "prop-types";
import { ChatContext } from "../../../contexts/Chat/ChatContext";
import { useContext, useEffect, useReducer } from "react";
import { VideoContext } from "../../../contexts/Video/VideoContext";

const ChatModal = ({ isOpen, handleClose }) => {
  const { messages } = useContext(ChatContext);

  // const { videoInView } = useContext(VideoContext);

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
            <button type={"button"}>AAAA</button>
          </S.Content>
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
  id: PropTypes.string,
};

ChatModal.defaultProps = {
  isOpen: false,
  handleClose: () => {},
  collection: "",
  id: "",
};
