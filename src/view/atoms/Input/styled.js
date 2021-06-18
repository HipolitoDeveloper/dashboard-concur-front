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
      : "1px solid var(--color-grey-medium)"};
  height: 50px;
  width: 50%;
  color: ${(props) =>
    props.isFromLogin ? "var(--color-white)" : "var(--color-grey)"};

  ::placeholder {
    color: ${(props) =>
      props.isFromLogin ? "var(--color-white)" : "var(--color-black)"};
  }

  :-webkit-autofill {
    -webkit-text-fill-color: var(--color-black) !important;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px white inset;
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
