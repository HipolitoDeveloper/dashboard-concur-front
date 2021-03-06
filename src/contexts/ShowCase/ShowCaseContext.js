import { createContext, useEffect, useReducer, useState } from "react";

import { loadImages, ShowCaseReducer } from "./ShowCaseReducer";

export const ShowCaseContext = createContext();

const initialState = {
  showCases: [
    {
      title: "Página Principal",
      collection: "homeShowCaseCollection",
      active: true,
    },
    {
      title: "Eventos",
      collection: "eventShowCaseCollection",
      active: false,
    },
    { title: "Blog", collection: "blogShowCaseCollection", active: false },
  ],
  showCaseInView: {
    collection: "homeShowCaseCollection",
    index: 0,
  },
};

const ShowCaseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ShowCaseReducer, initialState);

  useEffect(() => {}, []);

  const loadShowCase = async (payload, callback) => {
    await loadImages(state.showCaseInView).then((images) => {
      if (callback !== undefined) callback(state.showCaseInView);
      dispatch({ type: "LOAD_SHOWCASE", showCaseInView: state.showCaseInView });
    });
  };

  const chooseShowCase = async (payload) => {
    const index = payload;
    const buildShowCase = new Promise((resolve) => {
      state.showCases.forEach(async (itemTrue, t) => {
        if (index === t) {
          itemTrue.active = true;
          await loadImages(itemTrue);
          resolve(itemTrue);
        }
      });
    });

    state.showCaseInView = await buildShowCase;
    dispatch({ type: "CHOOSE_SHOWCASE", payload });
  };

  const deleteImageInShowCase = (payload) => {
    dispatch({ type: "DELETE_IMAGE", payload });
  };

  const contextValues = {
    chooseShowCase,
    loadShowCase,
    deleteImageInShowCase,
    ...state,
  };

  return (
    <ShowCaseContext.Provider value={contextValues}>
      {children}
    </ShowCaseContext.Provider>
  );
};

export default ShowCaseProvider;
