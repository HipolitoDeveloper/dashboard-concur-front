import * as S from "./styled";
import PropTypes from "prop-types";
import Input from "../Input";

const Button = ({
  text,
  type,
  onChange,
  name,
  width,
  height,
  backgroundColor,
  borderColor,
  color,
}) => {
  return (
    <S.Button
      type={type}
      onChange={onChange}
      name={name}
      width={width}
      backgroundColor={backgroundColor}
      color={color}
      borderColor={borderColor}
      height={height}
    >
      {text}
    </S.Button>
  );
};

export default Button;

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  borderColor: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Button.defaultProps = {
  name: "",
  type: "",
  text: "",
  width: "",
  height: "",
  borderColor: "",
  color: "",
  backgroundColor: "",
  onChange: () => {},
};
