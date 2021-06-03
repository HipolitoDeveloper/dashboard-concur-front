import * as S from "./styled";
import GlobalStyle from "../../../styles/global";

const menuItems = [
  { title: "Vitrine" },
  { title: "Eventos" },
  { title: "Cadastro" },
  { title: "Vídeos" },
  { title: "Blog" },
];

const SideMenu = () => {
  const renderItem = menuItems.map((item) => (
    <S.Item key={item.title}>
      <S.ItemTitlte>{item.title}</S.ItemTitlte>
    </S.Item>
  ));

  return (
    <S.Container>
      <GlobalStyle />
      <S.Content>
        <S.Header>
          <S.IconLogo />
        </S.Header>
        {renderItem}
      </S.Content>
    </S.Container>
  );
};

export default SideMenu;
