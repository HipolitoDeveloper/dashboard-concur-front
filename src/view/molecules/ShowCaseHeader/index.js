import * as S from "./styled";
import GlobalStyle from "../../../styles/global";
import { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { ShowCaseContext } from "../../../contexts/ShowCase/ShowCaseContext";

const ShowCaseHeader = ({ onChange }) => {
  const { showCases, chooseShowCase, showCaseInView } =
    useContext(ShowCaseContext);
  useEffect(() => {
    chooseShowCase(0);
  });
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
