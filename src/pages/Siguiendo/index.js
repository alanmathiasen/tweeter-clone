import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FollowWrapper,
  SectionWrapper,
  Line,
  LinkText,
  SecondaryText,
  ArticleWrapper,
  NoContentWrpapper,
  UserCard,
  SiguiendoBtn,
  UserCardContent,
} from "./Siguiendo.styles";
import PerfilNav from "../../components/PerfilComponents/PerfilNav";
import { Link } from "react-router-dom";
import { ButtonColored } from "../../components/Utils/ButtonColored";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useGlobalContext } from "../../context/GlobalContext";
import { usePerfilContext } from "../../context/PerfilContext";

const Siguiendo = () => {
  const { datosUser } = useGlobalContext();
  const {
    currentPerfil,
    currentPerfilMail,
    handleLoad,
    setPageItsLoad,
    pageItsLoad,
    getDatosPerfil,
  } = usePerfilContext();

  const { id } = useParams();
  const [mailsToCheck, setMailsToCheck] = useState([]);
  const [usersFollowing, setUsersFollowing] = useState([]);

  const handleFollowers = () => {
    if (currentPerfil.siguiendo) {
      let result = currentPerfil.siguiendo.map((item) => {
        return item;
      });
      setMailsToCheck(result);
    }
  };

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

  const handleFollowBtn = () => {
    datosUser.siguiendo.find();
  };

  useEffect(() => {
    setPageItsLoad(false);
    getDatosPerfil(id);
  }, []);

  useEffect(() => {
    handleLoad();
    handleFollowers();
    getFollowing();
  }, [pageItsLoad]);

  if (!pageItsLoad) {
    return <div></div>;
  }

  return (
    <FollowWrapper>
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
        {currentPerfil.siguiendo && currentPerfil.siguiendo.length > 0 ? (
          usersFollowing.map((user, index) => {
            let newRute = user.ruta;
            return (
              <UserCard key={index}>
                <Link to={`/${newRute}`}>
                  <UserCardContent>
                    <h3>{user.nombre}</h3>
                    <span>@{user.ruta}</span>
                    <p>{user.biografia}</p>
                  </UserCardContent>
                  {datosUser.siguiendo.includes(user.id) ? (
                    <SiguiendoBtn>
                      <span>Siguiendo</span>
                    </SiguiendoBtn>
                  ) : (
                    <button>Seguir</button>
                  )}
                </Link>
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
    </FollowWrapper>
  );
};

export default Siguiendo;
