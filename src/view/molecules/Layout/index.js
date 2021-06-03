import * as S from "./styled";
import GlobalStyle from "../../../styles/global";
import SideMenu from "../SideMenu";
import { SideMenuContent } from "./styled";

const menuItems = [
  { title: "Vitrine" },
  { title: "Eventos" },
  { title: "Cadastro" },
  { title: "Vídeos" },
  { title: "Blog" },
];

const Layout = ({ children }) => {
  return (
    <S.Container>
      <GlobalStyle />
      <S.SideMenuContent>
        <SideMenu />
      </S.SideMenuContent>
      {children}
    </S.Container>
  );
};

export default Layout;
