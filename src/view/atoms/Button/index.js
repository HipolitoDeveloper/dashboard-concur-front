import * as S from "./styled";

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
