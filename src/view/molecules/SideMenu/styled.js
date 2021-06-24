import styled from "styled-components";
import { ReactComponent as MarcaBot } from "../../../icons/marca-bot.svg";

const height = window.innerHeight;

export const Container = styled.div``;

export const Content = styled.div`
  width: 100%;
  height: 100%;
`;

export const Header = styled.header`
  width: 100%;
  background-color: black;
  height: 100px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const IconLogo = styled(MarcaBot)`
  width: 100%;
`;

export const LogoutContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 30px;
  cursor: pointer;
`;

export const LogoutContent = styled.div`
  margin-bottom: -30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-yellow);
  width: 100px;
  border-top-right-radius: 100px;
  border-top-left-radius: 100px;
  background-color: var(--color-yellow);
  span {
    color: var(--color-black);
    :hover {
      font-weight: bold;
      transition: all 0.5s;
    }
  }
  svg {
    color: var(--color-black);
  }
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
