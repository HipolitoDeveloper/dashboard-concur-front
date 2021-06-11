import { createContext, useEffect, useReducer, useState } from "react";

import { auth } from "../../services/firebase";
import { loadImages, ShowCaseReducer } from "./ShowCaseReducer";

export const ShowCaseContext = createContext();

const getShowCaseInView = localStorage.getItem("showCaseInView")
  ? JSON.parse(localStorage.getItem("showCaseInView"))
  : {
      collection: "homeCollection",
      index: 0,
    };

// const setStorage = (currentUser) => {
//   localStorage.setItem(
//     "showCase",
//     JSON.stringify(currentUser.length > 0 ? currentUser : null)
//   );
// };
const initialState = {
  showCases: [
    {
      title: "Página Principal",
      collection: "homeCollection",
      active: true,
    },
    {
      title: "Eventos",
      collection: "eventCollection",
      active: false,
    },
    { title: "Blog", collection: "blogCollection", active: false },
  ],
  showCaseInView: {
    collection: "homeCollection",
    index: 0,
  },
};

const ShowCaseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ShowCaseReducer, initialState);

  useEffect(() => {}, []);

  const loadShowCase = async (payload) => {
    await loadImages(state.showCaseInView);
    dispatch({ type: "LOAD_SHOWCASE", payload });
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

  const contextValues = {
    chooseShowCase,
    loadShowCase,
    ...state,
  };

  return (
    <ShowCaseContext.Provider value={contextValues}>
      {children}
    </ShowCaseContext.Provider>
  );
};

export default ShowCaseProvider;