import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-top: 200px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const PlaceContent = styled.div`
  border-bottom: 1px solid var(--color-grey-medium);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
`;

export const PlaceUpdateButton = styled.button`
  margin-right: 20px;
  svg {
    font-size: 25px;
  }

  :hover {
    svg {
      font-size: 30px;
    }
  }
`;

export const PlaceDeleteButton = styled.button`
  margin-right: 20px;
  svg {
    font-size: 25px;
  }

  :hover {
    svg {
      font-size: 30px;
    }
  }
`;

export const PlaceConfirmButton = styled.button`
  border-radius: 100px;
  border: 1px solid green;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color green;
  svg {
    font-size: 20px;
    color: white;
  }

  :hover {
    svg {
      color: green;
    }
    border: 1px solid green;
    background-color: white;

    transition: all 1s;
  }
`;

export const Input = styled.input`
  background-color: transparent;

  height: 50px;

  color: var(--color-grey);

  ::placeholder {
    color: var(--color-black);
  }

  :-webkit-autofill {
    -webkit-text-fill-color: var(--color-black) !important;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px white inset;
  }

  :focus {
    background-color: transparent;
  }
`;

export const AddPlace = styled.button`
  -webkit-box-shadow: -1px 14px 36px -8px rgba(0, 0, 0, 0.65);
  -moz-box-shadow: -1px 14px 36px -8px rgba(0, 0, 0, 0.65);
  box-shadow: -1px 14px 36px -8px rgba(0, 0, 0, 0.65);
  margin-top: 40px;
  border-radius: 100px;
  background-color: var(--color-yellow);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 40px;
  }

  :hover {
    -webkit-box-shadow: -1px 14px 36px 3px rgba(0, 0, 0, 0.65);
    -moz-box-shadow: -1px 14px 36px 3px rgba(0, 0, 0, 0.65);
    box-shadow: -1px 14px 36px 3px rgba(0, 0, 0, 0.65);

    transition: all 1s;
  }
`;
