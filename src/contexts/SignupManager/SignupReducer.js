import { db } from "../../services/firebase";

export const getPlaces = async () => {
  return new Promise(async (resolve) => {
    await db
      .collection("signupManagerCollection")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          let places = [];
          querySnapshot.docs.forEach((snapshot) => {
            let place = {};
            place.data = snapshot.data();
            place.id = snapshot.id;
            places.push(place);
          });
          resolve(places);
        }
      });
  });
};

export const SignupReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_PLACES":
      const places = action.places;
      return {
        ...state,
        places: places,
      };
    case "SAVE_PLACE":
      const place = action.payload;
      place.active = true;
      place.createdDate = new Date();

      db.collection("signupManagerCollection")
        .add(place)
        .then((id) => {});
      state.places.forEach((place) => {
        place.is_editting = false;
      });

      return {
        ...state,
        places: state.places,
      };

    case "DELETE_PLACE":
      if (action.payload.id === "") {
        state.places.pop();
      } else {
        db.collection("signupManagerCollection")
          .doc(action.payload.id)
          .delete()
          .then(() => {
            state.places.forEach((image, index) => {
              if (image.id === action.payload.id) {
                state.places.splice(index, 1);
              }
            });
          })
          .catch((error) => {
            console.log(error);
            alert("Tratar erro delete vídeo");
          });
      }

      return {
        ...state,
        places: state.places,
      };
    case "HANDLE_PLACE":
      const input = action.payload.input;
      const { value } = action.payload.input.target;
      const index = action.payload.index;
      const newInputs = state.places.map((place, i) => {
        if (index === i) {
          place.data = {
            ...place.data,
            [input.target.name]: value,
          };
          place.is_editting = true;
        }
        return place;
      });
      return {
        ...state,
        places: newInputs,
      };
    case "UPDATE_PLACE":
      let placeToUpdate = {};
      state.places.forEach((place, i) => {
        if (action.payload.place.id === place.id) {
          if (action.payload.updateStatus)
            place.data.active = !action.payload.place.data.active;
          else place.data = { ...action.payload.place.data };
          place.is_editting = false;
          placeToUpdate = place;
        }
      });

      placeToUpdate.data.updateAt = new Date();

      db.collection("signupManagerCollection")
        .doc(placeToUpdate.id)
        .update({ ...placeToUpdate.data })
        .then(() => {})
        .catch((e) => {
          alert("Tratar erro não foi possível alterar o input");
        });
      return {
        ...state,
        places: state.places,
      };
    case "ADD_PLACE":
      console.log(state.places);
      state.places.push({
        data: {
          place: "",
          active: true,
        },
        id: "",
      });
      return {
        ...state,
        places: state.places,
      };

    default:
      return state;
  }
};
