import * as Material from "@material-ui/core";
import * as S from "./styled";
import GlobalStyle from "../../../styles/global";
import Button from "../../atoms/Button";
import { db, storage } from "../../../services/firebase";
import PropTypes from "prop-types";

const UserInformations = ({ user, isOpen, handleClose }) => {
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
            <S.InputContent>
              <S.InputLabel>Administrador</S.InputLabel>
              {user.isAdmin ? (
                <S.Input value={"Sim"} disabled />
              ) : (
                <S.Input value={"Não"} disabled />
              )}
            </S.InputContent>
            <S.InputContent>
              <S.InputLabel>E-mail</S.InputLabel>
              <S.Input value={user.email} disabled />
            </S.InputContent>
            <S.InputContent>
              <S.InputLabel>Nome</S.InputLabel>
              <S.Input value={user.name} disabled />
            </S.InputContent>
            <S.InputContent>
              <S.InputLabel>Empresa</S.InputLabel>
              <S.Input value={user.company} disabled />
            </S.InputContent>
            <S.InputContent>
              <S.InputLabel>Profissão</S.InputLabel>
              <S.Input value={user.profession} disabled />
            </S.InputContent>
          </S.Content>
        </S.Container>
      </Material.Modal>
    </div>
  );
};

export default UserInformations;

UserInformations.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  user: PropTypes.array,
};

UserInformations.defaultProps = {
  isOpen: false,
  handleClose: () => {},
  user: {},
};
