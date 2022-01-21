import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  SectionWrapper,
  Line,
  LinkText,
  SecondaryText,
  ArticleWrapper,
  NoContentWrpapper,
  UserCard,
} from "./Siguiendo.styles";
import PerfilNav from "../../components/PerfilComponents/PerfilNav";
import { useGlobalContext } from "../../context/Context";
import { Link } from "react-router-dom";
import { ButtonColored } from "../../components/Utils/ButtonColored";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const Siguiendo = () => {
  const { currentPerfil, currentPerfilMail } = useGlobalContext();
  const { id } = useParams();
  const [mailsToCheck, setMailsToCheck] = useState([]);
  const [usersFollowing, setUsersFollowing] = useState([]);

  const handleFollowers = () => {
    let result = currentPerfil.siguiendo.map((item) => {
      return item;
    });
    setMailsToCheck(result);
  };

  //getFollowers
  const getFollowing = async () => {
    const usuariosRef = collection(db, "usuarios");
    const followingUsers = query(
      usuariosRef,
      where("seguidores", "array-contains", currentPerfilMail)
    );

    const querySnapshot = await getDocs(followingUsers);
    querySnapshot.forEach((doc) => {
      let newArray = [];
      newArray = doc.data();
      newArray.id = doc.id;

      let checkExist = false;
      usersFollowing.map((item) => {
        item.id.includes(newArray.id)
          ? (checkExist = true)
          : (checkExist = false);
      });
      if (checkExist === false) {
        setUsersFollowing((usersFollowing) => [...usersFollowing, newArray]);
        console.log("cargando state");
      } else {
        return;
      }
    });
  };

  useEffect(() => {
    handleFollowers();
    getFollowing();
  }, []);

  return (
    <div>
      <PerfilNav />
      <SectionWrapper>
        <Link to={`/${id}/seguidores`}>
          <SecondaryText>Seguidores</SecondaryText>
        </Link>
        <Link to={`/${id}/siguiendo`}>
          <LinkText>Siguiendo</LinkText>
          <Line> </Line>
        </Link>
      </SectionWrapper>
      <ArticleWrapper>
        {currentPerfil.siguiendo.length > 0 ? (
          usersFollowing.map((user, index) => {
            return (
              <UserCard key={index}>
                <h3>{user.nombre}</h3>
                <span>{user.id}</span>
                <p>{user.biografia}</p>
              </UserCard>
            );
          })
        ) : (
          <NoContentWrpapper>
            <h2>No sigues a nadie</h2>
            <p>
              Cuando lo hagas, aparecerán aquí, y tú podrás ver sus Tweets en tu
              cronología.
            </p>
            <ButtonColored children="Encuentra personas para seguir" />
          </NoContentWrpapper>
        )}
      </ArticleWrapper>
    </div>
  );
};

export default Siguiendo;
