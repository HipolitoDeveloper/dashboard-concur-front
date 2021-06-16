import styled from "styled-components";

export const Content = styled.div`
  background-color: transparent;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  background-color: transparent;
  border-bottom: ${(props) =>
    props.isFromLogin
      ? "1px solid var(--color-white)"
      : "1px solid var(--color-black)"};
  height: 50px;
  width: 50%;
  color: ${(props) =>
    props.isFromLogin ? "var(--color-white)" : "var(--color-grey)"};

  ::placeholder {
    color: ${(props) =>
      props.isFromLogin ? "var(--color-white)" : "var(--color-grey)"};
  }

  :hover {
    border-bottom: ${(props) =>
      props.isFromLogin
        ? "5px solid var(--color-white)"
        : "5px solid var(--color-grey)"};
    transition: all 1s;
  }

  :focus {
    background-color: transparent;
  }
`;
