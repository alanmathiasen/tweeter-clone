import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
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
  doc,
  getDoc,
  onSnapshot,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const Perfil = ({ correoUsuario, emailLogueado, datosUser, setDatosUser }) => {
  const navigate = useNavigate();
  const [perfilModalOpen, setPerfilModalOpen] = useState(false);
  const { biografia, nombre, sitioWeb, ubicacion } = datosUser;

  const handlePerfilModal = () => {
    setPerfilModalOpen(!perfilModalOpen);
  };

  useEffect(() => {
    console.log("State email:", emailLogueado);
  }, [emailLogueado]);

  return (
    <PerfilWrapper>
      <PerfilNav>
        <ButtonBack onClick={() => navigate(-1)}>
          <BiArrowBack />
        </ButtonBack>
        <NavInfo>
          <h3>{nombre}</h3>
          <p>250 Tweets</p>
        </NavInfo>
      </PerfilNav>

      <PerfilContainer>
        <PortadaContainer>
          <Portada src={ImgPortada} alt="portada" />
        </PortadaContainer>
        <ImgPerfil src={imgPerfil} />
        <EditarPerfil onClick={handlePerfilModal}>Editar Perfil</EditarPerfil>
        <InfoPerfil>
          <h2>{nombre}</h2>
          <span>{emailLogueado}</span>
          <p>{biografia}</p>
          <SeguidoresYSeguidosWrapper>
            <SeguidoresYSeguidos>
              <span>1,235 </span>Seguidos
            </SeguidoresYSeguidos>
            <SeguidoresYSeguidos>
              <span>11.5K </span>Seguidores
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
