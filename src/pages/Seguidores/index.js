import React, { useState, useEffect } from "react";
import {
  useParams,
  location,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
  ImagePerfil,
} from "../Siguiendo/Siguiendo.styles.js";
import PerfilNav from "../../components/PerfilComponents/PerfilNav";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useGlobalContext } from "../../context/GlobalContext";
import { usePerfilContext } from "../../context/PerfilContext.js";
import { ButtonSeguir } from "../../components/Utils/ButtonSeguir/index.js";
import ImgPerfil from "../../imgs/perfil.jpg";

const Seguidores = () => {
  const { datosUser } = useGlobalContext();
  const {
    currentPerfil,
    currentPerfilMail,
    handleLoad,
    setPageItsLoad,
    pageItsLoad,
    getDatosPerfil,
    handleFollow,
  } = usePerfilContext();

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [mailsToCheck, setMailsToCheck] = useState([]);
  const [usersFollowers, setUsersFollowers] = useState([]);
  const [btnState, setBtnState] = useState(false);

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
    //VALIDA QUE BUSQUE SOLO LOS SEGUIDORES EL PERFIL ACTUAL
    if (currentPerfil.ruta === id) {
      handleFollowers();
      getFollowers();
    }
  }, [currentPerfilMail, id]);

  const handleClick = (uId) => {
    handleFollow(uId);
    setBtnState(!btnState);
  };
  const goTo = (e, rutaId) => {
    if (e.currentTarget !== e.target) {
      if (!["BUTTON"].includes(e.target.nodeName)) {
        navigate("/" + rutaId);
      }
    } else {
      navigate("/" + rutaId);
    }
  };

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
            let rutaId = user.ruta;
            return (
              <UserCard
                key={index}
                onClick={(e) => {
                  goTo(e, rutaId);
                }}
              >
                <div className="datos-container">
                  {user.photoURL ? (
                    <ImagePerfil
                      src={user.photoURL}
                      alt={`'Img perfil '${user.nombre}`}
                    />
                  ) : (
                    <ImagePerfil
                      src={ImgPerfil}
                      alt={`'Img perfil '${user.nombre}`}
                    />
                  )}
                  <di>
                    <UserCardContent>
                      <h3>{user.nombre}</h3>
                      <span>@{user.ruta}</span>
                      <p>{user.biografia}</p>
                    </UserCardContent>
                  </di>
                </div>

                {datosUser.siguiendo.includes(user.id) ? (
                  <ButtonSeguir
                    onClick={() => handleClick(user.id)}
                    btnState={btnState}
                    color={"#000"}
                    bg={"#fff"}
                    maxWidth={"200px"}
                    hoverColor={"red"}
                    hoverBgColor={"#ff9f9f"}
                    contentTxt={"Dejar de seguir"}
                  >
                    <span>Siguiendo</span>
                  </ButtonSeguir>
                ) : (
                  <ButtonSeguir
                    onClick={() => handleClick(user.id)}
                    contentTxt={"Seguir"}
                  >
                    <span>Seguir</span>
                  </ButtonSeguir>
                )}
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
