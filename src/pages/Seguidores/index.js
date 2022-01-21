import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  SectionWrapper,
  LinkText,
  Line,
  SecondaryText,
  ArticleWrapper,
  NoContentWrpapper,
  UserCard,
} from "../Siguiendo/Siguiendo.styles.js";
import PerfilNav from "../../components/PerfilComponents/PerfilNav";
import { useGlobalContext } from "../../context/Context";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const Seguidores = () => {
  const { currentPerfil, currentPerfilMail } = useGlobalContext();
  const { id } = useParams();
  const [mailsToCheck, setMailsToCheck] = useState([]);
  const [usersFollowers, setUsersFollowers] = useState([]);

  const handleFollowers = () => {
    let result = currentPerfil.siguiendo.map((item) => {
      return item;
    });
    setMailsToCheck(result);
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

  useEffect(() => {
    handleFollowers();
    getFollowers();
  }, []);

  return (
    <div>
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
        {currentPerfil.seguidores.length > 0 ? (
          usersFollowers.map((user, index) => {
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
            <h2>Aún no tienes ningún seguidor</h2>
            <p>Cuando alguien te siga, lo verás aquí.</p>
          </NoContentWrpapper>
        )}
      </ArticleWrapper>
    </div>
  );
};

export default Seguidores;
