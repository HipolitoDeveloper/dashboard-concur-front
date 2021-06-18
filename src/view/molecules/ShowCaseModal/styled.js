import styled from "styled-components";
import { ReactComponent as MarcaBot } from "../../../icons/marca-bot.svg";
import { ReactComponent as Imaage } from "../../../icons/addfoto.svg";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.form`
  top: 150px;
  position: absolute;
  border-radius: 100px;
  background-color: var(--color-grey-medium);
  width: 30%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  width: 200px;
  height: 200px;
  cursor: pointer;
`;

export const ImageSpot = styled.div`
  height: 200px;
  width: 200px;
  border: 1px solid var(--color-yellow);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageInput = styled.input`
  height: 1px;
  width: 1px;
  //overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
`;

export const ImageContent = styled.label``;

export const ImageIcon = styled(Imaage)`
  width: 130px;
  border-radius: 10%;
  cursor: pointer;
  background-color: var(--color-grey-medium);
  .addfoto-4,
  .addfoto-1 {
    color: #888888;
    fill: var(--color-yellow);
  }
`;

export const IconLogo = styled(MarcaBot)`
  width: 250px;
  margin-top: 1rem;
  margin-bottom: 3rem;
`;
