import { db, storage } from "../../services/firebase";
import { v4 as uuidv4 } from "uuid";

export const getEvents = async () => {
  return new Promise(async (resolve) => {
    await db
      .collection("eventsCollection")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          let events = [];
          querySnapshot.docs.forEach((snapshot) => {
            let event = {};
            event.data = snapshot.data();
            event.id = snapshot.id;
            events.push(event);
          });
          resolve(events);
          // storage(videos);
        } else {
          resolve([]);
        }
      });
  });
};

// export const storage = (videos) => {
//   localStorage.setItem("videos", JSON.stringify(videos));
// };

export const EventReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_EVENT":
      let eventToUpdate = {};
      state.events.forEach((event, i) => {
        if (action.payload.event.id === event.id) {
          if (action.payload.updateStatus)
            event.data.is_live = !action.payload.event.data.is_live;
          else event.data = { ...action.payload.event.data };

          eventToUpdate = event;
        }
      });

      eventToUpdate.data.updateAt = new Date();

      db.collection("eventsCollection")
        .doc(eventToUpdate.id)
        .update({ ...eventToUpdate.data })
        .then(() => {})
        .catch((e) => {
          alert("Tratar erro não foi possível alterar o evento");
        });
      return {
        ...state,
        events: state.events,
      };
    case "LOAD_EVENTS":
      state.events = action.events;
      return {
        ...state,
        videos: state.videos,
      };
    case "SAVE_EVENT":
      const blob = action.payload.blob;
      const event = action.payload;
      event.is_live = true;
      event.type = "live";
      event.createdDate = new Date();
      const userFileNameImage = `images/${uuidv4()}-${blob.image}`;
      delete event.blob;

      const uploadTask = storage
        .ref()
        .child(userFileNameImage)
        .put(blob, { contentType: blob.type });

      uploadTask.on(
        "state_changed",
        () => {},
        () => {},
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            event.image = downloadURL;
            db.collection("eventsCollection")
              .add(event)
              .then((id) => {
                if (state.posts === null) {
                  state.event = [];
                  state.events.push({ id: id.id, data: event });
                } else {
                  state.events.push({ id: id.id, data: event });
                }
              });
          });
        }
      );

      return {
        ...state,
        events: state.events,
      };
    case "SET_EVENTINVIEW":
      const eventInView = action.payload;
      return {
        ...state,
        eventInView: eventInView,
      };

    case "DELETE_EVENT":
      db.collection("eventsCollection")
        .doc(action.payload.id)
        .delete()
        .then(() => {
          state.events.forEach((image, index) => {
            if (image.id === action.payload.id) {
              if (state.events.length <= 1) state.events = [];
              else state.events = state.events.splice(index, 1);
            }
          });
        })
        .catch((error) => {
          console.log(error);
          alert("Tratar erro delete evento");
        });
      return {
        ...state,
        events: state.events,
      };

    case "CLEAR_EVENTINVIEW":
      state.eventInView = {};
      return {
        ...state,
        eventInView: state.eventInView,
      };
    default:
      return state;
  }
};
