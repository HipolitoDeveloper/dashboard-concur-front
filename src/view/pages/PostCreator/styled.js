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

export const PostForm = styled.form`
  width: 60%;
  padding-top: 20px;
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

export const DeleteItem = styled.button``;

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
