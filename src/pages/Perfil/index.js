import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams, useLocation } from "react-router-dom";
import {
  PerfilWrapper,
  ButtonBack,
  PerfilNav,
  NavInfo,
  PerfilContainer,
  PortadaContainer,
  Portada,
  ImgPerfil,
  EditarPerfil,
  InfoPerfil,
  SeguidoresYSeguidosWrapper,
  SeguidoresYSeguidos,
  PerfilModalContainer,
  OverlayModal,
  AllLinksWrapper,
  LinkWrapper,
  InfoIcon,
} from "./Perfil.styles";
import { BiArrowBack } from "react-icons/bi";
import ImgPortada from "../../imgs/portada.jpg";
import imgPerfil from "../../imgs/perfil.jpg";
// COMPONENTES
import TweetsNavbar from "../../components/TweetsNavbar";
import Tweet from "../../components/Tweet";
import PerfilModal from "../../components/PerfilModal";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { GoLocation } from "react-icons/go";
import { IoIosLink } from "react-icons/io";
import { BsCalendarEvent } from "react-icons/bs";

const Perfil = ({
  correoUsuario,
  emailLogueado,
  datosUser,
  setDatosUser,
  getDatosUsuario,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [perfilModalOpen, setPerfilModalOpen] = useState(false);
  const [currentPerfil, setCurrentPerfil] = useState({});
  const [currentPerfilMail, setCurrentPerfilMail] = useState("");
  const [itsCurrentUserProfile, setItsCurrentUserProfile] = useState(true);
  const [handleFollowButton, setHandleFollowButton] = useState(false);
  const [siguiendo, setSiguiendo] = useState(0);
  const [seguidores, setSeguidores] = useState(0);
  const [pageItsLoad, setPageItsLoad] = useState(true);

  const handlePerfilModal = () => {
    setPerfilModalOpen(!perfilModalOpen);
  };

  const handleLoad = () => {
    if (currentPerfilMail) {
      setPageItsLoad(true);
      console.log("pagina cargada");
    }
  };

  const handleItsCurrentUserProfile = () => {
    if (id === datosUser.ruta) {
      setItsCurrentUserProfile(true);
      console.log("mismo usuario");
    } else {
      setItsCurrentUserProfile(false);
      console.log("No el mismo usuario");
    }
  };

  const getDatosPerfil = async () => {
    const usuariosRef = collection(db, "usuarios");
    const currentPerfil = query(usuariosRef, where("ruta", "==", id));

    const querySnapshot = await getDocs(currentPerfil);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      setCurrentPerfil(doc.data());
      setCurrentPerfilMail(doc.id);
      console.log("current perfil mail actualizado");

      if (doc.data().siguiendo) {
        setSiguiendo(doc.data().siguiendo.length);
      } else {
        setSiguiendo(0);
      }
      if (doc.data().seguidores) {
        setSeguidores(doc.data().seguidores.length);
      } else {
        setSeguidores(0);
      }
    });
    setPageItsLoad(true);
  };

  const checkFollowAlready = () => {
    let mail = String(currentPerfilMail);
    let array = [];
    console.log("chekFollow activada");

    if (datosUser.siguiendo) {
      array = datosUser.siguiendo;
      let resp = array.includes(mail);
      console.log("buscando el mail en array");
      if (resp) {
        setHandleFollowButton(true);
        console.log("el mail si se encuentra");
      } else {
        setHandleFollowButton(false);
        console.log("el mail no se encuentra");
      }
    }
  };

  const goBack = () => {
    navigate(-1);
    setItsCurrentUserProfile(true);
  };

  const handleFollow = async () => {
    setHandleFollowButton(!handleFollowButton);
    let mailASeguir = currentPerfilMail;
    if (mailASeguir) {
      if (handleFollowButton) {
        const logguedUserRef = await updateDoc(
          doc(db, "usuarios", emailLogueado),
          {
            siguiendo: arrayRemove(mailASeguir),
          }
        );

        const seguidoRef = await updateDoc(doc(db, "usuarios", mailASeguir), {
          seguidores: arrayRemove(emailLogueado),
        });
      } else {
        const logguedUserRef = await updateDoc(
          doc(db, "usuarios", emailLogueado),
          {
            siguiendo: arrayUnion(mailASeguir),
          }
        );

        const seguidoRef = await updateDoc(doc(db, "usuarios", mailASeguir), {
          seguidores: arrayUnion(emailLogueado),
        });
      }
    }
  };

  useEffect(() => {
    console.log("cargando pagina");
    setPageItsLoad(false);
  }, []);

  useEffect(() => {
    getDatosPerfil();
  }, [location]);

  useEffect(() => {
    handleLoad();
  }, [datosUser]);

  useEffect(() => {
    checkFollowAlready();
    handleItsCurrentUserProfile();
  });

  if (!pageItsLoad) {
    return (
      <PerfilWrapper>
        <PerfilContainer>
          <PortadaContainer>
            <Portada src={ImgPortada} alt="portada" />
          </PortadaContainer>
          <ImgPerfil src={imgPerfil} />
        </PerfilContainer>
      </PerfilWrapper>
    );
  }

  return (
    <PerfilWrapper>
      <PerfilNav>
        <ButtonBack onClick={() => goBack()}>
          <BiArrowBack />
        </ButtonBack>
        <NavInfo>
          <h3>{currentPerfil.nombre}</h3>
          <p>250 Tweets</p>
        </NavInfo>
      </PerfilNav>

      <PerfilContainer>
        <PortadaContainer>
          <Portada src={ImgPortada} alt="portada" />
        </PortadaContainer>
        <ImgPerfil src={imgPerfil} />

        {itsCurrentUserProfile ? (
          <EditarPerfil
            itsCurrentUserProfile={itsCurrentUserProfile}
            onClick={handlePerfilModal}
          >
            Editar Perfil
            {console.log("editar perfil")}
          </EditarPerfil>
        ) : (
          <EditarPerfil
            itsCurrentUserProfile={itsCurrentUserProfile}
            handleFollowButton={handleFollowButton}
            onClick={handleFollow}
          >
            {handleFollowButton ? "Dejar de seguir" : "Seguir"}
            {console.log("dejar de seguir o seguir")}
          </EditarPerfil>
        )}

        <InfoPerfil>
          <h2>{currentPerfil.nombre}</h2>
          <span>{currentPerfilMail}</span>
          <p>{currentPerfil.biografia}</p>
          <AllLinksWrapper>
            <LinkWrapper>
              <InfoIcon>
                <GoLocation />
              </InfoIcon>
              <p>{currentPerfil.ubicacion}</p>
            </LinkWrapper>
            <LinkWrapper>
              <InfoIcon>
                <IoIosLink />
              </InfoIcon>
              <a href={currentPerfil.sitioWeb} target="_blank" rel="noreferrer">
                {currentPerfil.sitioWeb}
              </a>
            </LinkWrapper>
            <LinkWrapper>
              <InfoIcon>
                <BsCalendarEvent />
              </InfoIcon>
              <p>Se unió en ...</p>
            </LinkWrapper>
          </AllLinksWrapper>

          <SeguidoresYSeguidosWrapper>
            <SeguidoresYSeguidos>
              <span>{siguiendo}</span>Siguiendo
            </SeguidoresYSeguidos>
            <SeguidoresYSeguidos>
              <span>{seguidores}</span>Seguidores
            </SeguidoresYSeguidos>
          </SeguidoresYSeguidosWrapper>
        </InfoPerfil>
      </PerfilContainer>

      <OverlayModal
        perfilModalOpen={perfilModalOpen}
        onClick={handlePerfilModal}
      />

      <PerfilModalContainer perfilModalOpen={perfilModalOpen}>
        <PerfilModal
          handlePerfilModal={handlePerfilModal}
          correoUsuario={correoUsuario}
          emailLogueado={emailLogueado}
          datosUser={datosUser}
          setDatosUser={setDatosUser}
        />
      </PerfilModalContainer>
      <TweetsNavbar />
      <Tweet />
    </PerfilWrapper>
  );
};

export default Perfil;
