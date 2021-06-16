import * as S from "./styled";
import * as Material from "@material-ui/core";
import GlobalStyle from "../../../styles/global";
import PropTypes from "prop-types";

const AlertModal = ({ title, description, isOpen, handleClose, handleOk }) => {
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
            <S.Header>{title}</S.Header>
            <S.Main>{description}</S.Main>
            <S.Footer>
              <S.Options>
                <S.OkButton onClick={handleOk} name={"ok"} type={"button"}>
                  OK
                </S.OkButton>
                <S.CloseButton
                  onClick={handleClose}
                  name={"close"}
                  type={"button"}
                >
                  Fechar
                </S.CloseButton>
              </S.Options>
            </S.Footer>
          </S.Content>
        </S.Container>
      </Material.Modal>
    </div>
  );
};

export default AlertModal;

AlertModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  handleOk: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
};

AlertModal.defaultProps = {
  isOpen: false,
  title: "",
  description: "",
  handleClose: () => {},
  handleOk: () => {},
};
