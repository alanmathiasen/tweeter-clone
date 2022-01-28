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
import { useGlobalContext } from "../../context/GlobalContext";
import { usePerfilContext } from "../../context/PerfilContext";

const Perfil = () => {
  const { id } = useParams();
  const location = useLocation();

  const { datosUser } = useGlobalContext();

  const {
    getDatosPerfil,
    currentPerfilMail,
    pageItsLoad,
    setPageItsLoad,
    handleLoad,
  } = usePerfilContext();

  const [perfilModalOpen, setPerfilModalOpen] = useState(false);
  const [itsCurrentUserProfile, setItsCurrentUserProfile] = useState(true);
  const [handleFollowButton, setHandleFollowButton] = useState(false);

  const handlePerfilModal = () => {
    setPerfilModalOpen(!perfilModalOpen);
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
      />

      <OverlayModal
        perfilModalOpen={perfilModalOpen}
        onClick={handlePerfilModal}
      />

      <PerfilModalContainer perfilModalOpen={perfilModalOpen}>
        <PerfilModal handlePerfilModal={handlePerfilModal} />
      </PerfilModalContainer>
      <TweetsNavbar />
      <Tweet />
    </PerfilWrapper>
  );
};

export default Perfil;
