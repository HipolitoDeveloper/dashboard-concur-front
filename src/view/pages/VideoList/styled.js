import styled from "styled-components";
import { DataGrid } from "@material-ui/data-grid";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

export const Content = styled.div`
  height: 85%;
  overflow-y: scroll;
`;

export const HeaderTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: var(--color-yellow);
`;

export const ChatIcon = styled.span`
  cursor: pointer;

  :hover {
    svg {
      font-size: 30px;
      transition: all 1s;
    }
  }
`;

export const EditIcon = styled.span`
  cursor: pointer;
  :hover {
    svg {
      font-size: 30px;
      transition: all 1s;
    }
  }
`;

export const Title = styled.span`
  font-size: 16px;
`;

export const ThumbnailContent = styled.div`
  height: 100px;
  width: 100px;
  border: 1px solid var(--color-black);
`;
