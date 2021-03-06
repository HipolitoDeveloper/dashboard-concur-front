import { db } from "../../services/firebase";

export const loadImages = async (collection) => {
  return new Promise(async (resolve) => {
    await db
      .collection(collection.collection)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          collection.images = [];
          querySnapshot.docs.forEach((snapshot) => {
            let image = { id: "", data: {} };
            image.data = snapshot.data();
            image.id = snapshot.id;
            collection.images.push(image);
          });
          resolve(collection.images);
        } else {
          resolve([]);
        }
      });
  });
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
      };
    case "LOAD_SHOWCASE":
      state.showCaseInView = action.showCaseInView;
      return {
        showCaseInView: state.showCaseInView,
        showCases: state.showCases,
      };
    case "DELETE_IMAGE":
      state.showCaseInView.images.forEach((image, index) => {
        if (image.id === action.payload.id) {
          state.showCaseInView.images.splice(index, 1);
        }
      });
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
