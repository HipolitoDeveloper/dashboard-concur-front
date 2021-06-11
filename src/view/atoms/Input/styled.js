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
  border-bottom: 1px solid var(--color-white);
  height: 50px;
  width: 50%;
  color: var(--color-white);

  ::placeholder {
    color: var(--color-white);
  }

  :hover {
    border-bottom: 5px solid var(--color-white);
    transition: all 1s;
  }

  :focus {
    background-color: transparent;
  }
`;
