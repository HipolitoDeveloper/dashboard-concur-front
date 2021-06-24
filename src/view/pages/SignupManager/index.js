import * as S from "./styled";
import Input from "../../atoms/Input";
import { useContext, useEffect, useState } from "react";
import { SignupContext } from "../../../contexts/SignupManager/SignupContext";
import {
  AddPlace,
  PlaceConfirmButton,
  PlaceContent,
  PlaceDeleteButton,
  PlaceUpdateButton,
} from "./styled";
import * as Icon from "@material-ui/icons";

const SignupManager = () => {
  const {
    loadPlaces,
    places,
    handlePlace,
    updatePlace,
    addPlace,
    savePlace,
    deletePlace,
  } = useContext(SignupContext);

  useEffect(() => {
    const getInputs = async () => {
      await loadPlaces();
    };
    getInputs();
  }, []);

  const handleUpdate = (place, updateStatus) => {
    updatePlace({ place: place, updateStatus: updateStatus });
  };

  const handleSave = (place, updateStatus) => {
    if (place.id === "") {
      savePlace(place.data);
    } else {
      handleUpdate(place, updateStatus);
    }
  };

  const handleDelete = async (place) => {
    await deletePlace(place);

    setTimeout(() => {
      loadPlaces();
      //Implementar loading
    }, 1000);
  };

  const renderInputs = places?.map((place, index) => (
    <S.Content key={index}>
      <S.PlaceUpdateButton
        type={"button"}
        onClick={() => handleUpdate(place, true)}
      >
        {place?.data.active ? (
          <Icon.Star style={{ color: "var(--color-yellow)" }} />
        ) : (
          <Icon.StarBorderOutlined style={{ color: "var(--color-yellow)" }} />
        )}
      </S.PlaceUpdateButton>
      <S.PlaceContent>
        <S.Input
          type="text"
          onChange={(value) => handlePlace({ input: value, index: index })}
          name="place"
          value={place.data.place}
        />

        {place?.is_editting && (
          <S.PlaceConfirmButton
            type={"button"}
            onClick={() => handleSave(place, false)}
          >
            <Icon.Done />
          </S.PlaceConfirmButton>
        )}
      </S.PlaceContent>
      <S.PlaceDeleteButton type={"button"} onClick={() => handleDelete(place)}>
        <Icon.Delete />
      </S.PlaceDeleteButton>
    </S.Content>
  ));

  return (
    <S.Container>
      {renderInputs}
      <S.AddPlace type={"button"} onClick={addPlace}>
        <Icon.Add style={{ color: "var(--color-white)" }} />
      </S.AddPlace>
    </S.Container>
  );
};

export default SignupManager;
