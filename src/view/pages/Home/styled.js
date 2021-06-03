import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Header = styled.span`
  margin: 50px;
  color: var(--color-yellow);
  font-size: 20px;
  font-weight: bold;
`;

export const GraphicContent = styled.div``;

export const UserContent = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
`;

export const UserHeader = styled.span`
  width: 60%;
  display: flex;
  flex-direction: row;
  margin: 0px 0px 20px 70px;
  justify-content: space-between;

  span {
    font-weight: bold;
    color: var(--color-yellow);
  }
`;

export const UserItem = styled.span`
  margin-top: 5px;
  display: grid;
  flex-direction: row;
  grid-template-columns: 20% 50% 30%;
`;

export const UserImg = styled.img`
  width: 30px;
  border-radius: 100px;
`;

export const EmptyImg = styled.div`
  border: 1px solid var(--color-grey);
  width: 30px;
  height: 30px;
  border-radius: 100px;
`;

export const UserName = styled.span`
  margin-top: 5px;
  font-weight: bold;
  color: ${(props) =>
    props.color ? "var(--color-yellow)" : "var(--color-grey)"};
`;
