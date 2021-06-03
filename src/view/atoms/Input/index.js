import * as S from "./styled";
import PropTypes from "prop-types";

const Input = ({ type, name, value, onChange, required, placeholder }) => {
  return (
    <S.Content>
      <S.Input
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
};

Input.defaultProps = {
  placeholder: "",
  value: "",
  required: false,
};
