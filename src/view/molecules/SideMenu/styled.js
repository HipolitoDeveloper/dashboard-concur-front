import styled from "styled-components";
import { ReactComponent as MarcaBot } from "../../../icons/marca-bot.svg";

const height = window.innerHeight;

export const Container = styled.div``;

export const Content = styled.div`
  width: 100%;
  height: 100%;
`;

export const Header = styled.header`
  background-color: black;
  height: 100px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconLogo = styled(MarcaBot)`
  width: 100%;
`;

export const Item = styled.div`
  background-color: var(--color-yellow);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(187, 134, 2);

  a {
    color: var(--color-white);
    font-size: 25px;
  }
}

:hover {
  text-shadow: 4px 4px 0px rgba(150, 150, 150, 0.43);
  cursor: pointer;

  transition: all 0.5s;
}

.active {
  color: black;
  font-weight: bold
`;
