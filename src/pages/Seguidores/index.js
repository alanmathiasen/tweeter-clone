import React, { useState, useEffect } from "react";
import { useParams, location, useLocation } from "react-router-dom";
import {
  FollowWrapper,
  SectionWrapper,
  LinkText,
  Line,
  SecondaryText,
  ArticleWrapper,
  NoContentWrpapper,
  UserCard,
  SiguiendoBtn,
  UserCardContent,
} from "../Siguiendo/Siguiendo.styles.js";
import PerfilNav from "../../components/PerfilComponents/PerfilNav";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useGlobalContext } from "../../context/GlobalContext";
import { usePerfilContext } from "../../context/PerfilContext.js";

const Seguidores = () => {
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
  const location = useLocation();
  const [mailsToCheck, setMailsToCheck] = useState([]);
  const [usersFollowers, setUsersFollowers] = useState([]);

  useEffect(() => {
    setPageItsLoad(false);
    getDatosPerfil(id);
  }, []);

  useEffect(() => {
    const handleFollowers = () => {
      if (currentPerfil.seguidores) {
        let result = currentPerfil.siguiendo.map((item) => {
          return item;
        });
        setMailsToCheck(result);
      }
    };

    const getFollowers = async () => {
      const usuariosRef = collection(db, "usuarios");
      const followersUsers = query(
        usuariosRef,
        where("siguiendo", "array-contains", currentPerfilMail)
      );

      const querySnapshot = await getDocs(followersUsers);
      querySnapshot.forEach((doc) => {
        let newArray = [];
        newArray = doc.data();
        newArray.id = doc.id;

        let checkExist = false;
        usersFollowers.map((item) => {
          item.id.includes(newArray.id)
            ? (checkExist = true)
            : (checkExist = false);
        });
        if (checkExist === false) {
          setUsersFollowers((usersFollowers) => [...usersFollowers, newArray]);
          console.log("cargando state");
        } else {
          return;
        }
      });
    };
    handleLoad();
    handleFollowers();
    getFollowers();
  }, [location, id]);

  if (!pageItsLoad) {
    return <div></div>;
  }

  return (
    <FollowWrapper>
      <PerfilNav />
      <SectionWrapper>
        <Link to={`/${id}/seguidores`}>
          <LinkText>Seguidores</LinkText>
          <Line> </Line>
        </Link>
        <Link to={`/${id}/siguiendo`}>
          <SecondaryText>Siguiendo</SecondaryText>
        </Link>
      </SectionWrapper>
      <ArticleWrapper>
        {currentPerfil.seguidores && currentPerfil.seguidores.length > 0 ? (
          usersFollowers.map((user, index) => {
            let newRute = user.ruta;
            return (
              <UserCard key={index}>
                <Link to={`/${newRute}`}>
                  <UserCardContent>
                    <h3>{user.nombre}</h3>
                    <span>{user.id}</span>
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
            <h2>Aún no tienes ningún seguidor</h2>
            <p>Cuando alguien te siga, lo verás aquí.</p>
          </NoContentWrpapper>
        )}
      </ArticleWrapper>
    </FollowWrapper>
  );
};

export default Seguidores;
