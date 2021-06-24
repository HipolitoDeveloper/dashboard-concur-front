import * as S from "./styled";
import PropTypes from "prop-types";
import Input from "../Input";

const Button = ({
  text,
  type,
  onClick,
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
      onClick={onClick}
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
  onClick: PropTypes.func.isRequired,
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
  onClick: () => {},
};
