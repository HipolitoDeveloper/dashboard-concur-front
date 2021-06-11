import * as S from "./styled";
import Input from "../../atoms/Input";
import { useContext, useState } from "react";
import GlobalStyle from "../../../styles/global";
import Button from "../../atoms/Button";
import { UserContext } from "../../../contexts/User/UserContext";
import { Redirect } from "react-router-dom";
// import Toast from "../../atoms/Toast";

const Login = () => {
  const { doSignIn, currentUser } = useContext(UserContext);
  const [userData, setUserData] = useState({});

  if (currentUser) {
    return <Redirect to="/home" />;
  }

  const handleLogin = async (event) => {
    doSignIn(event, userData);
  };

  const handleChange = (input) => {
    const { value } = input.target;
    setUserData({
      ...userData,
      [input.target.name]: value,
    });
  };

  return (
    <S.Container>
      <GlobalStyle />
      <S.IconLogo />
      <S.Content>
        <S.IconAtivo7 />
        <S.FormDescription>
          Bem vindo ao <br />
          <b>SAP Concur Content Dashbord</b>
        </S.FormDescription>
        <S.Form onSubmit={handleLogin}>
          <Input
            type="text"
            onChange={handleChange}
            name="email"
            value={userData.email}
            placeholder="Digite aqui o seu e-mail..."
            required={true}
          />
          <Input
            type="password"
            onChange={handleChange}
            name="password"
            value={userData.password}
            placeholder="Digite aqui a sua senha..."
            required={true}
          />
          <Button
            backgroundColor="var(--color-white)"
            type="submit"
            width="40%"
            height="50px"
            name="submitButton"
            color="var(--color-grey)"
            borderColor="var(--color-white)"
            text={"Entrar"}
          />
        </S.Form>
      </S.Content>
      {/*<Toast />*/}
    </S.Container>
  );
};

export default Login;
