import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--color-black);
  height: 90px;
  border-bottom-right-radius: 100px;
  border-bottom-left-radius: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Content = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderItem = styled.div``;

export const HeaderTitle = styled.span`
  color: ${(props) =>
    props.active ? "var(--color-yellow)" : "var(--color-grey)"};
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
`;
