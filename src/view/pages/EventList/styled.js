import styled from "styled-components";
import { DataGrid } from "@material-ui/data-grid";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

export const Content = styled.div`
  width: 100%;
  height: 85%;
  overflow-y: scroll;
`;

export const HeaderTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: var(--color-yellow);
  text-transform: uppercase;
`;

export const ChatIcon = styled.button`
  cursor: pointer;

  :hover {
    svg {
      font-size: 25px;
      transition: all 0.2s;
    }
  }
`;

export const EditIcon = styled.span`
  cursor: pointer;
  :hover {
    svg {
      font-size: 25px;
      transition: all 0.2s;
    }
  }
`;

export const Title = styled.span`
  font-size: 16px;
`;

export const Image = styled.img`
  height: 100px;
  width: 100px;
  cursor: pointer;
`;

export const ImageSpot = styled.img`
  height: 100px;
  width: 100px;
  border: 1px solid var(--color-black);
`;

export const ThumbnailContent = styled.div``;

export const FabButton = styled.div`
  button {
    position: fixed;
    bottom: 50px;
    right: 50px;
  }
`;

export const DeleteButton = styled.button`
  -webkit-box-shadow: -1px 14px 36px 3px rgba(0, 0, 0, 0.65);
  -moz-box-shadow: -1px 14px 36px 3px rgba(0, 0, 0, 0.65);
  box-shadow: -1px 14px 36px 3px rgba(0, 0, 0, 0.65);
  height: 30px;
  width: 30px;
  background-color: red;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 15px;
  left: -10px;

  :hover {
    height: 35px;
    width: 35px;

    svg {
      font-size: 30px;
    }
    transition: all 0.2s;
  }
`;
