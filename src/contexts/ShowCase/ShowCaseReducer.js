import { db } from "../../services/firebase";

export const loadImages = async (collection) => {
  await db
    .collection(collection.collection)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.docs.length > 0) {
        collection.images = [];
        querySnapshot.docs.forEach((snapshot) => {
          collection.images.push(snapshot.data());
        });
        storage(collection);
      }
    });
};

export const storage = (showCaseInView) => {
  localStorage.setItem("showCaseInView", JSON.stringify(showCaseInView));
};

export const ShowCaseReducer = (state, action) => {
  switch (action.type) {
    case "CHOOSE_SHOWCASE":
      const index = action.payload;
      state.showCases.forEach((itemFalse, f) => {
        if (index !== f) itemFalse.active = false;
      });

      return {
        ...state,
        showCases: state.showCases,
        showCaseInView: state.showCaseInView,
      };
    case "LOAD_SHOWCASE":
      return {
        showCaseInView: state.showCaseInView,
        showCases: state.showCases,
      };

    // case "CLEAR_ALL":
    //     return {
    //         transactions: [],
    //         ...storage([]),
    //     }
    default:
      return state;
  }
};
