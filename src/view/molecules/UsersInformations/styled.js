import styled from "styled-components";
import { ReactComponent as MarcaBot } from "../../../icons/marca-bot.svg";
import { ReactComponent as Imaage } from "../../../icons/addfoto.svg";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  top: 150px;
  position: absolute;
  border-radius: 100px;
  background-color: white;
  width: 30%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const InputContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

export const InputLabel = styled.label`
  color: var(--color-grey-user);
  background-color: white;
  font-weight: bold;
  margin-right: 15px;
  position: relative;
  top: 10px;
  left: 8px;

  z-index: 5;
`;

export const Input = styled.input`
  border: 1px solid var(--color-grey-user);
  border-radius: 100px;
  padding: 15px;
  color: var(--color-yellow);
  ::placeholder {
    color: var(--color-yellow);
  }
`;
