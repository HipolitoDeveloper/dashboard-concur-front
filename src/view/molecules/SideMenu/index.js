import * as S from "./styled";
import GlobalStyle from "../../../styles/global";
import { NavLink } from "react-router-dom";

const menuItems = [
  { title: "Vitrine", route: "/vitrine" },
  { title: "Vídeos", route: "/videos" },
  { title: "Eventos", route: "/eventos" },
  { title: "Blog", route: "/posts" },
  { title: "Cadastro", route: "/gerenciar/cadastro" },
];

const SideMenu = () => {
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
        {renderItem}
      </S.Content>
    </S.Container>
  );
};

export default SideMenu;
