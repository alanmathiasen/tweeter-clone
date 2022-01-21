import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  PerfilWrapper,
  PerfilContainer,
  PortadaContainer,
  Portada,
  ImgPerfil,
  PerfilModalContainer,
  OverlayModal,
} from "./Perfil.styles";
import ImgPortada from "../../imgs/portada.jpg";
import imgPerfil from "../../imgs/perfil.jpg";
// COMPONENTES
import TweetsNavbar from "../../components/TweetsNavbar";
import Tweet from "../../components/Tweet";
import PerfilModal from "../../components/PerfilComponents/PerfilModal";
import PerfilNav from "../../components/PerfilComponents/PerfilNav";
import DatosPerfil from "../../components/PerfilComponents/DatosPerfil";
import { useGlobalContext } from "../../context/Context";

import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const Perfil = ({
  correoUsuario,
  emailLogueado,
  datosUser,
  setDatosUser,
  getDatosUsuario,
}) => {
  const { id } = useParams();
  const location = useLocation();

  const { getDatosPerfil, currentPerfilMail, pageItsLoad, setPageItsLoad } =
    useGlobalContext();

  const [perfilModalOpen, setPerfilModalOpen] = useState(false);
  const [itsCurrentUserProfile, setItsCurrentUserProfile] = useState(true);
  const [handleFollowButton, setHandleFollowButton] = useState(false);

  const handlePerfilModal = () => {
    setPerfilModalOpen(!perfilModalOpen);
  };

  const handleLoad = () => {
    if (currentPerfilMail) {
      setPageItsLoad(true);
    }
  };

  const handleItsCurrentUserProfile = () => {
    if (id === datosUser.ruta) {
      setItsCurrentUserProfile(true);
    } else {
      setItsCurrentUserProfile(false);
    }
  };

  const checkFollowAlready = () => {
    let mail = String(currentPerfilMail);
    let array = [];
    if (datosUser.siguiendo) {
      array = datosUser.siguiendo;
      let resp = array.includes(mail);
      if (resp) {
        setHandleFollowButton(true);
      } else {
        setHandleFollowButton(false);
      }
    } else {
      return;
    }
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
    setPageItsLoad(false);
  }, []);

  useEffect(() => {
    getDatosPerfil(id);
  }, [location]);

  useEffect(() => {
    handleLoad();
    checkFollowAlready();
  }, [datosUser]);

  useEffect(() => {
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
      <PerfilNav />

      <DatosPerfil
        itsCurrentUserProfile={itsCurrentUserProfile}
        handlePerfilModal={handlePerfilModal}
        handleFollowButton={handleFollowButton}
        handleFollow={handleFollow}
      />

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
