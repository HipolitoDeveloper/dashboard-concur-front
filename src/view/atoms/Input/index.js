import * as S from "./styled";
import PropTypes from "prop-types";
import GlobalStyle from "../../../styles/global";

const Input = ({
  type,
  name,
  value,
  onChange,
  required,
  placeholder,
  isFromLogin,
}) => {
  return (
    <S.Content>
      <S.Input
        isFromLogin={isFromLogin}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    </S.Content>
  );
};

export default Input;

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  isFromLogin: PropTypes.bool,
};

Input.defaultProps = {
  placeholder: "",
  value: "",
  required: false,
  isFromLogin: true,
};
