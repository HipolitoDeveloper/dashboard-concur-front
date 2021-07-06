import styled from "styled-components";

export const Content = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const BackButton = styled.button``;

export const VideoForm = styled.form`
  width: 60%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
`;

export const ImageSpot = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid var(--color-black);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const SubmitButton = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const ImageInput = styled.input`
  height: 1px;
  width: 1px;
  //overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
`;

export const ImageContent = styled.label``;

export const Image = styled.img`
  width: 200px;
  height: 200px;
  cursor: pointer;
`;

export const DropdownContent = styled.div`
  margin-top: 20px;
  width: 50%;
`;

export const FooterButtons = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ParticipantsContent = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  p {
    font-size: 12px;
    color: var(--color-grey);
    font-weight: bold;
  }
  svg {
    font-size: 38px;
  }
  cursor: pointer;
  :hover {
    p {
      color: var(--color-yellow);
    }
    transition: all 2s;
  }
`;

export const SwitchButtonLive = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  p {
    font-size: 12px;

    color: var(--color-grey);
    font-weight: bold;
  }

  :hover {
    p {
      color: var(--color-yellow);
    }
    transition: all 2s;
  }
`;

export const CarouselContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 200px;
`;

export const CarouselContainer = styled.div`
  height: 450px;
  z-index: 5;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AddImage = styled.button`
  position: relative;
  top: 100px;
  border: 3px solid var(--color-yellow);
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    color: var(--color-yellow);
  }

  -webkit-box-shadow: -1px 14px 36px -8px rgba(0, 0, 0, 0.65);
  -moz-box-shadow: -1px 14px 36px -8px rgba(0, 0, 0, 0.65);
  box-shadow: -1px 14px 36px -8px rgba(0, 0, 0, 0.65);
`;

export const DeleteButton = styled.button`
  position: relative;
  top: 100px;
  cursor: pointer;
  height: 30px;
  width: 30px;
  background-color: red;
  border-radius: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: -1px 14px 36px -8px rgba(0, 0, 0, 0.65);
  -moz-box-shadow: -1px 14px 36px -8px rgba(0, 0, 0, 0.65);
  box-shadow: -1px 14px 36px -8px rgba(0, 0, 0, 0.65);
  svg {
    color: black;
  }
`;

export const Buttons = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;
export const ShowCaseImageContent = styled.div`
  img {
    width: 100px;
    height: 350px;
  }
`;
