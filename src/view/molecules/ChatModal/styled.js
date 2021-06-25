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
  overflow-y: scroll;
  top: 150px;
  position: absolute;
  border-top-left-radius: 100px;
  border-top-right-radius: 100px;

  background-color: var(--color-white);
  width: 30%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 80px;
`;

export const RenderContainer = styled.div`
  width: 100%;
`;

export const LineContainer = styled.div`
  width: 100%;
  border: 1px solid var(--color-yellow);
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 20px;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  padding-left: 10px;
`;

export const ChatContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const ChatHeader = styled.div`
  color: var(--color-grey-user);
  font-size: 10px;
`;

export const ChatMessage = styled.div`
  margin-top: 20px;
  color: var(--color-yellow);
  font-weight: bold;
  font-size: 15px;
`;

export const ChatUserImage = styled.div`
  width: 60px;
  margin-top: 10px;
`;

export const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
`;

export const UserMenu = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: var(--color-text);
`;

export const ChatDeleteButton = styled.button`
  margin-top: 25px;
  width: 20px;
  cursor: pointer;
  svg {
    color: red;
  }
`;
