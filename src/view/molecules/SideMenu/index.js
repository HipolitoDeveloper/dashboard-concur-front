import * as S from "./styled";
import GlobalStyle from "../../../styles/global";
import { NavLink } from "react-router-dom";

const menuItems = [
  { title: "Vitrine", route: "/vitrine" },
  { title: "Eventos", route: "/eventos" },
  { title: "Cadastro", route: "/cadastro/concur" },
  { title: "Vídeos", route: "/videos" },
  { title: "Blog", route: "/posts" },
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
