import styled from "styled-components";
import { ReactComponent as Cast } from "../../../icons/cast.svg";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CarouselContainer = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

export const ImageContent = styled.div`
  border: 1px solid red;
  img {
    height: 500px;
  }
`;

export const Bottom = styled.div`
  height: 50px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  svg {
    cursor: pointer;
  }
`;

export const BottomItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h6 {
    color: var(--color-grey);
    margin-bottom: 5px;
  }

  :checked {
    background-color: var(--color-yellow);
  }

  .delete-button {
    color: var(--color-yellow);
    font-size: 40px;
    :hover {
      font-size: 50px;
      transition: 1s all;
    }
  }
`;

export const FabButton = styled.div`
  button {
    float: right;
    margin: 20px 30px 0 0;
  }
`;

export const EmptyMessage = styled.span``;
