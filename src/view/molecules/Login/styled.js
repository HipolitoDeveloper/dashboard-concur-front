import styled from "styled-components";
import { ReactComponent as MarcaBot } from "../../../icons/marca-bot.svg";
import { ReactComponent as Ativo7 } from "../../../icons/ativo7.svg";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background-color: #999999;
`;

export const Content = styled.div`
  -webkit-box-shadow: 1px -5px 19px 3px rgba(0, 0, 0, 0.27);
  -moz-box-shadow: 1px -5px 19px 3px rgba(0, 0, 0, 0.27);
  box-shadow: 1px -5px 19px 3px rgba(0, 0, 0, 0.27);
  border-top-left-radius: 100px;
  border-top-right-radius: 100px;
  background-color: var(--color-grey);
  height: 90%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormDescription = styled.p`
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IconLogo = styled(MarcaBot)`
  width: 550px;
  margin-top: 1rem;
  margin-bottom: 3rem;
`;

export const IconAtivo7 = styled(Ativo7)`
  width: 200px;
  margin-bottom: 1.7rem;
`;
