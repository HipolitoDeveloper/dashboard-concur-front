import { db, storage } from "../../services/firebase";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/app";

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
            getParticipants(event);
            events.push(event);
          });
          resolve(events);
        } else {
          resolve([]);
        }
      });
  });
};

export const getParticipants = (event) => {
  db.collection("eventsCollection")
    .doc(event.id)
    .collection("participantsCollection")
    .get()
    .then((participantsQuerySnapshot) => {
      event.data.participants = [];
      if (participantsQuerySnapshot.docs.length > 0) {
        participantsQuerySnapshot.docs.forEach((snapshotParticipant) => {
          const participant = snapshotParticipant.data();
          participant.is_original = true;
          participant.is_new = false;
          event.data.participants.push({
            data: participant,
            id: snapshotParticipant.id,
          });
        });
      }
    });
};

export const uploadParticipant = (participant, eventId, blob) => {
  const participantFileNameImage = `images/participants/${uuidv4()}-${
    blob.image
  }`;
  const uploadParticipants = storage
    .ref()
    .child(participantFileNameImage)
    .put(blob, {
      contentType: blob.type,
    });

  delete participant.blob;
  uploadParticipants.on(
    "state_changed",
    () => {},
    () => {},
    () => {
      uploadParticipants.snapshot.ref
        .getDownloadURL()
        .then((participantImageDownloaded) => {
          participant.image = participantImageDownloaded;
          db.collection("eventsCollection")
            .doc(eventId)
            .collection("participantsCollection")
            .add({ ...participant })
            .then(() => {
              participant.is_original = true;
              participant.is_new = false;
            });
        });
    }
  );
};

export const createImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
};

export const EventReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_EVENT":
      let eventToUpdate = {};
      state.events.map((event, i) => {
        if (action.payload.event.id === event.id) {
          if (action.payload.updateStatus)
            event.data.is_live = !action.payload.event.data.is_live;
          else event.data = { ...action.payload.event.data };

          eventToUpdate = event;
        }
      });

      eventToUpdate.data.updateAt = new Date();

      const newEvent = eventToUpdate.data;
      db.collection("eventsCollection")
        .doc(eventToUpdate.id)
        .update({ ...newEvent })
        .then(() => {})
        .catch((e) => {
          alert("Tratar erro não foi possível alterar o evento");
        });

      return {
        ...state,
      };
    case "LOAD_EVENTS":
      state.events = action.events;
      return {
        ...state,
        videos: state.videos,
      };
    case "SAVE_EVENT":
      const { event, hasParticipants } = action.payload;
      const { blob } = event;
      event.is_live = true;
      event.type = "live";
      event.createdDate = new Date();
      const eventFileNameImage = `images/${uuidv4()}-${blob.image}`;
      delete event.blob;
      delete event.participants;

      const uploadTask = storage
        .ref()
        .child(eventFileNameImage)
        .put(blob, { contentType: blob.type });

      uploadTask.on(
        "state_changed",
        () => {},
        () => {},
        () => {
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then((eventImageDownloaded) => {
              event.image = eventImageDownloaded;
              db.collection("eventsCollection")
                .add(event)
                .then((id) => {
                  if (hasParticipants) {
                    state.eventInView.data = {
                      is_live: true,
                      participants: [],
                      id: id.id,
                    };
                  } else {
                    state.eventInView.data = {
                      is_live: true,
                      participants: [],
                    };
                  }

                  if (state.events === null) {
                    state.events = [];
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
        eventInView: state.eventInView,
      };
    case "SAVE_PARTICIPANT":
      let id = state.eventInView.data.id;
      if (id === undefined) {
        id = state.eventInView.id;
      }

      const { participant, participantBlob } = action.payload;

      uploadParticipant(participant, id, participantBlob);

      return {
        ...state,
        eventInView: state.eventInView,
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
      state.eventInView = {
        data: {
          is_live: true,
          participants: [],
        },
      };
      return {
        ...state,
        eventInView: state.eventInView,
      };
    case "ADD_PARTICIPANT":
      if (state.eventInView.data.participants === undefined) {
        state.eventInView.data.participants = [];
      } else {
        state.eventInView.data.participants.push({
          data: {
            image: "",
            name: "",
            profession: "",
            blob: "",
            is_original: true,
            is_new: true,
          },
        });
      }
      return {
        ...state,
        eventInView: state.eventInView,
      };
    case "DELETE_PARTICIPANT":
      const participantToDeleteIndex = action.payload.index;
      const participantToDeleteId = action.payload.id;

      if (participantToDeleteId) {
        state.eventInView.data.participants.splice(participantToDeleteIndex, 1);
        db.collection("eventsCollection")
          .doc(state.eventInView.id)
          .collection("participantsCollection")
          .doc(participantToDeleteId)
          .delete()
          .then(() => {})
          .catch((error) => {
            console.log(error);
            alert("Tratar erro delete participante");
          });
      } else {
        state.eventInView.data.participants.splice(participantToDeleteIndex, 1);
      }

      return {
        ...state,
        eventInView: state.eventInView,
      };

    case "HANDLE_PARTICIPANT":
      const { input, participantToChangeIndex, e, isImageChanging } =
        action.payload;
      let value = "";
      if (input !== undefined) value = input.target.value;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const newParticipants = state.eventInView.data.participants.map(
        (participant, i) => {
          if (isImageChanging) {
            let file = "";
            if (e !== undefined) file = e.target.files[0];

            const reader = new FileReader();
            reader.addEventListener(
              "load",
              () => {
                if (participantToChangeIndex === i) {
                  participant.data.image = reader.result;

                  createImage(participant.data.image).then((img) => {
                    canvas.width = 250;
                    canvas.height = 250;

                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    canvas.toBlob((blob) => {
                      participant.blob = blob;
                    }, "image/jpeg");
                  });

                  if (participant.data.is_new !== true)
                    participant.data.is_original = false;
                }
              },
              false
            );

            if (file) {
              reader.readAsDataURL(file);
            }

            return participant;
          } else {
            if (participantToChangeIndex === i) {
              if (participant.data.is_new !== true)
                participant.data.is_original = false;
              participant.data = {
                ...participant.data,
                [input.target.name]: value,
              };
            }

            return participant;
          }
        }
      );

      state.eventInView.data.participants = newParticipants;

      return {
        ...state,
        eventInView: state.eventInView,
      };
    case "EDIT_PARTICIPANT":
      const newParticipant = action.payload;
      const participantId = newParticipant.id;

      let eventId = state.eventInView.data.id;
      if (eventId === undefined) {
        eventId = state.eventInView.id;
      }
      newParticipant.data.is_original = true;
      db.collection("eventsCollection")
        .doc(eventId)
        .collection("participantsCollection")
        .doc(participantId)
        .update({ ...newParticipant.data })
        .then(() => {})
        .catch((e) => {
          alert("Tratar erro não foi possível alterar o participante");
          console.log(e);
        });
      return {
        ...state,
        eventInView: state.eventInView,
      };
    case "FIX_EVENT":
      let eventInViewId = state.eventInView.data.id;
      if (eventInViewId === undefined) {
        eventInViewId = state.eventInView.id;
      }
      const participantsArray = db
        .collection("eventsCollection")
        .doc(eventInViewId);

      const removeParticipants = participantsArray.update({
        participants: firebase.firestore.FieldValue.delete(),
      });

      return {
        ...state,
        eventInView: state.eventInView,
      };
    default:
      return state;
  }
};
