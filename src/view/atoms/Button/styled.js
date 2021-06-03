import styled from "styled-components";

export const Button = styled.button`
  margin-top: 20px;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 100px;
  font-weight: bold;
  font-size: 20px;

  :hover {
    background-color: ${(props) => props.color};
    color: ${(props) => props.backgroundColor};
    transition: all 0.5s;
  }
`;
