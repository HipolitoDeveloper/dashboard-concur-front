import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  top: 150px;
  position: absolute;
  border-radius: 20px;
  background-color: var(--color-white);
  width: 30%;
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Header = styled.div`
  margin-top: 20px;
  width: 100%;
  float: left;
  margin-left: 40px;
  color: var(--color-yellow);
  font-weight: bold;
  font-size: 20px;
`;

export const Main = styled.div`
  color: var(--color-grey-user);
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  border-top: 1px solid var(--color-grey-medium);
`;

export const Options = styled.span`
  margin-right: 20px;
`;

export const OkButton = styled.button`
  font-size: 15px;
  margin-right: 20px;
  color: var(--color-yellow);

  :hover {
    font-size: 16px;
    font-weight: bold;
    transition: all 0.5s;
  }
`;

export const CloseButton = styled.button`
  font-size: 15px;
  color: var(--color-grey-medium);

  :hover {
    font-size: 16px;
    font-weight: bold;
    transition: all 0.5s;
  }
`;
