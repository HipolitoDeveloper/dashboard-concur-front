import * as S from "./styled";
import { useContext, useEffect, useState } from "react";

import * as Material from "@material-ui/core";
import * as Icon from "@material-ui/icons";
import ChatModal from "../../molecules/ChatModal";
import { ChatContext } from "../../../contexts/Chat/ChatContext";
import { EventContext } from "../../../contexts/Event/EventContext";

const HeaderItems = [
  { nome: "Vídeo" },
  { nome: "TÍTULO" },
  { nome: "CONFIRMADOS" },
  { nome: "CHAT" },
  { nome: "AO VIVO" },
  { nome: "EDITAR" },
];

const EventList = ({ history }) => {
  const {
    events,
    loadEvents,
    updateEvent,
    setEventInView,
    deleteEvent,
    eventInView,
  } = useContext(EventContext);

  const { loadMessages } = useContext(ChatContext);

  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isGuestManagerOpen, setIsGuestManagerOpen] = useState(false);
  const [eventInViewId, setEventInViewId] = useState("");

  useEffect(() => {
    const getEvents = async () => {
      await loadEvents();
    };
    getEvents();
  }, []);

  const handleChange = (event) => {
    updateEvent({ event: event, updateStatus: true });
  };

  const handleEdit = async (event) => {
    await setEventInView(event);
    history.push("/eventos/criador");
  };

  const handleDelete = async (event) => {
    await deleteEvent(event);

    setTimeout(() => {
      loadEvents();
      //Implementar loading
    }, 1000);
  };

  const handleChatModal = async (event) => {
    if (event.type !== "click") {
      await setEventInView(event);
      await loadMessages({ collection: "eventsCollection", id: event.id });
    }

    setEventInViewId(event.id);
    setIsChatModalOpen(!isChatModalOpen);
  };

  const handleGuestManagerModal = () => {
    setIsGuestManagerOpen(!isGuestManagerOpen);
  };

  const renderHeader = HeaderItems.map((item) => (
    <Material.TableCell key={item.nome}>
      <S.HeaderTitle>{item.nome}</S.HeaderTitle>
    </Material.TableCell>
  ));

  const renderEvents = events?.map((event, index) => (
    <Material.TableRow key={event?.id}>
      <Material.TableCell component="th" scope="row">
        <S.DeleteButton type={"button"} onClick={() => handleDelete(event)}>
          <Icon.Delete style={{ color: "var(--color-white)", fontSize: 25 }} />
        </S.DeleteButton>
        <S.ThumbnailContent>
          {event?.data?.images.length > 0 ? (
            <S.Image src={event?.data?.images[0].image} alt="Imagem do post" />
          ) : (
            <S.ImageSpot />
          )}
        </S.ThumbnailContent>
      </Material.TableCell>
      <Material.TableCell component="th" scope="row">
        <S.Title>{event?.data?.title}</S.Title>
      </Material.TableCell>
      <Material.TableCell component="th" scope="row">
        <S.Title onClick={handleGuestManagerModal}>
          {event?.data?.confirmed_users}
        </S.Title>
      </Material.TableCell>
      <Material.TableCell component="th" scope="row">
        <S.ChatIcon onClick={() => handleChatModal(event)}>
          <Icon.Chat style={{ color: "var(--color-yellow)" }} />
        </S.ChatIcon>
      </Material.TableCell>
      <Material.TableCell component="th" scope="row">
        <Material.Switch
          checked={event?.data?.is_live}
          onChange={() => handleChange(event)}
          color="primary"
          name="isAvailable"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </Material.TableCell>
      <Material.TableCell component="th" scope="row">
        <S.EditIcon onClick={() => handleEdit(event)}>
          <Icon.Edit style={{ color: "var(--color-yellow)" }} />
        </S.EditIcon>
      </Material.TableCell>
    </Material.TableRow>
  ));

  return (
    <S.Container>
      <S.Content>
        <Material.Table stickyHeader>
          <Material.TableHead>
            <Material.TableRow>{renderHeader}</Material.TableRow>
          </Material.TableHead>

          <Material.TableBody>{renderEvents}</Material.TableBody>
        </Material.Table>
      </S.Content>
      <S.FabButton>
        <Material.Fab
          aria-label="add"
          style={{ backgroundColor: "var(--color-yellow" }}
          onClick={() => history.push("/eventos/criador")}
        >
          <Icon.Add style={{ color: "var(--color-white" }} />
        </Material.Fab>
      </S.FabButton>

      <ChatModal
        isOpen={isChatModalOpen}
        handleClose={handleChatModal}
        inViewId={eventInViewId}
      />
    </S.Container>
  );
};

export default EventList;
