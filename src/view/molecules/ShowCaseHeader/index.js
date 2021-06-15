import * as S from "./styled";
import GlobalStyle from "../../../styles/global";
import { useCallback, useContext, useEffect } from "react";
import { ShowCaseContext } from "../../../contexts/ShowCase/ShowCaseContext";

const ShowCaseHeader = ({ onChange }) => {
  const { showCases, chooseShowCase, showCaseInView } =
    useContext(ShowCaseContext);

  const choose = () => {
    chooseShowCase(0);
  };

  useEffect(() => {
    choose();
  }, []);

  const renderHeaderItem = showCases?.map((item, index) => (
    <S.HeaderItem
      key={item.title}
      onClick={() => {
        chooseShowCase(index);
        onChange(0);
      }}
    >
      <S.HeaderTitle active={item.active}>{item.title}</S.HeaderTitle>
    </S.HeaderItem>
  ));
  return (
    <S.Container>
      <GlobalStyle />
      <S.Content>{renderHeaderItem}</S.Content>
    </S.Container>
  );
};

export default ShowCaseHeader;
