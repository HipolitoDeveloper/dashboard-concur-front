import * as S from "./styled";
import { useEffect, useState } from "react";
import { db } from "../../../services/firebase";
import { DragSwitch } from "react-dragswitch";
import "react-dragswitch/dist/index.css";
import UserInformations from "../../molecules/UsersInformations";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isUserInformationModalOpen, setIsUserInformationModalOpen] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const dbUsers = [];
    await db
      .collection("usersCollection")
      .get()
      .then(async (querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          querySnapshot.docs.forEach((doc) => {
            if (!doc.data().isAdmin) {
              dbUsers.push(doc.data());
            }
          });
          setUsers(dbUsers);
        }
      });
  };

  const handleUserInformationModal = (user) => {
    setIsUserInformationModalOpen(!isUserInformationModalOpen);

    if (user) setSelectedUser(user);
  };

  const renderUsers = users.map((user) => (
    <S.UserItem
      key={user.name}
      onClick={() => handleUserInformationModal(user)}
    >
      {user.image ? <S.UserImg src={user.image} /> : <S.EmptyImg />}
      <S.UserName color={user.image}>{user.name}</S.UserName>{" "}
      {/*Verificar se está online*/}
      <DragSwitch
        checked={user.isOnline}
        onColor={"var(--color-yellow"}
        disabled
      />
    </S.UserItem>
  ));

  return (
    <S.Container>
      <S.Header>SAPConcurContent Dashboard</S.Header>
      <S.Content>
        <S.GraphicContent>Gráfico</S.GraphicContent>
        <S.UserContent>
          <S.UserHeader>
            <span>NOME</span> <span>ATIVO</span>
          </S.UserHeader>
          {renderUsers}
        </S.UserContent>
      </S.Content>

      <UserInformations
        isOpen={isUserInformationModalOpen}
        handleClose={handleUserInformationModal}
        user={selectedUser}
      />
    </S.Container>
  );
};

export default Home;
