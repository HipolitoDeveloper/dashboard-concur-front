import * as S from "./styled";
import GlobalStyle from "../../../styles/global";
import { useContext } from "react";
import PropTypes from "prop-types";
import { ShowCaseContext } from "../../../contexts/ShowCase/ShowCaseContext";

const ShowCaseHeader = () => {
  const { showCases, chooseShowCase } = useContext(ShowCaseContext);

  const renderHeaderItem = showCases?.map((item, index) => (
    <S.HeaderItem key={item.title} onClick={() => chooseShowCase(index)}>
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
