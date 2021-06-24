import * as S from "./styled";
import GlobalStyle from "../../../styles/global";
import { NavLink } from "react-router-dom";
import * as Icon from "@material-ui/icons";
import { LogoutContainer } from "./styled";
import { UserContext } from "../../../contexts/User/UserContext";
import { useContext } from "react";

const menuItems = [
  { title: "Vitrine", route: "/vitrine" },
  { title: "Vídeos", route: "/videos" },
  { title: "Eventos", route: "/eventos" },
  { title: "Blog", route: "/posts" },
  { title: "Cadastro", route: "/gerenciar/cadastro" },
];

const SideMenu = () => {
  const { doSignOut } = useContext(UserContext);

  const logout = async () => {
    await doSignOut().then(() => {
      window.location.href = "/";
    });
  };
  const renderItem = menuItems.map((item) => (
    <S.Item key={item.title}>
      <NavLink to={item.route} activeClassName="active">
        {item.title}
      </NavLink>
    </S.Item>
  ));

  return (
    <S.Container>
      <GlobalStyle />
      <S.Content>
        <S.Header>
          <NavLink to={"/home"}>
            <S.IconLogo />
          </NavLink>
        </S.Header>
        <S.LogoutContainer>
          <S.LogoutContent type={"button"} onClick={logout}>
            <span>Logout</span>
            <Icon.PowerOff />
          </S.LogoutContent>
        </S.LogoutContainer>
        {renderItem}
      </S.Content>
    </S.Container>
  );
};

export default SideMenu;
