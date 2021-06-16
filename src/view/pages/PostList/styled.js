import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

export const HeaderTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: var(--color-yellow);
  text-transform: uppercase;
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

export const SubTitle = styled.span`
  font-size: 13px;
`;

export const FabButton = styled.div`
  button {
    position: fixed;
    bottom: 50px;
    right: 50px;
  }
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
