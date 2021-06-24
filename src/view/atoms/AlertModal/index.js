import * as S from "./styled";
import * as Material from "@material-ui/core";
import GlobalStyle from "../../../styles/global";
import PropTypes from "prop-types";

const AlertModal = ({
  title,
  description,
  isOpen,
  handleClose,
  handleOk,
  handleThree,
  optionOne,
  optionTwo,
  optionThree,
}) => {
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
                <S.OkButton onClick={handleOk} name={optionOne} type={"button"}>
                  {optionOne}
                </S.OkButton>
                {optionThree !== "" && (
                  <S.OkButton
                    onClick={handleThree}
                    name={optionThree}
                    type={"button"}
                  >
                    {optionThree}
                  </S.OkButton>
                )}
                <S.CloseButton
                  onClick={handleClose}
                  name={optionTwo}
                  type={"button"}
                >
                  {optionTwo}
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
  optionOne: PropTypes.string,
  optionTwo: PropTypes.string,
  optionThree: PropTypes.string,
};

AlertModal.defaultProps = {
  isOpen: false,
  title: "",
  description: "",
  handleClose: () => {},
  handleOk: () => {},
  optionOne: "OK",
  optionTwo: "Cancelar",
  optionThree: "",
};
