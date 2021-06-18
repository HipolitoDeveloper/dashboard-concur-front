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
  overflow-x: scroll;
  top: 0;
  position: absolute;
  border-radius: 100px;
  background-color: var(--color-white);
  width: 95%;
  height: 95%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ParticipantContent = styled.div`
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
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageInput = styled.input`
  height: 1px;
  width: 1px;
  clip: rect(1px, 1px, 1px, 1px);
`;

export const ImageContent = styled.label``;

export const ImageIcon = styled(Imaage)`
  width: 130px;
  border-radius: 10%;
  cursor: pointer;
  background-color: var(--color-white);
  .addfoto-4,
  .addfoto-1 {
    color: #888888;
    fill: var(--color-yellow);
  }
`;

export const SubmitButtonContent = styled.div`
  position: absolute;
  bottom: 100px;
  right: 100px;
`;

export const AddParticipant = styled.button`
  -webkit-box-shadow: -1px 14px 36px -8px rgba(0, 0, 0, 0.65);
  -moz-box-shadow: -1px 14px 36px -8px rgba(0, 0, 0, 0.65);
  box-shadow: -1px 14px 36px -8px rgba(0, 0, 0, 0.65);
  margin-left: 40px;
  border-radius: 100px;
  background-color: var(--color-yellow);

  svg {
    font-size: 60px;
  }

  :hover {
    -webkit-box-shadow: -1px 14px 36px 3px rgba(0, 0, 0, 0.65);
    -moz-box-shadow: -1px 14px 36px 3px rgba(0, 0, 0, 0.65);
    box-shadow: -1px 14px 36px 3px rgba(0, 0, 0, 0.65);

    svg {
      font-size: 70px;
    }

    transition: all 1s;
  }
`;
