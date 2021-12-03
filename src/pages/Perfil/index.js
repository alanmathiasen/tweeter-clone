import React from "react";
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
} from "./Perfil.styles";
import { BiArrowBack } from "react-icons/bi";

import ImgPortada from "../../imgs/portada.jpg";
import imgPerfil from "../../imgs/perfil.jpg";

import TweetsNavbar from "../../components/TweetsNavbar";
import Tweet from "../../components/Tweet";

const Perfil = () => {
  const navigate = useNavigate();

  return (
    <PerfilWrapper>
      <PerfilNav>
        <ButtonBack onClick={() => navigate(-1)}>
          <BiArrowBack />
        </ButtonBack>
        <NavInfo>
          <h3>Rick Sanchez</h3>
          <p>250 Tweets</p>
        </NavInfo>
      </PerfilNav>

      <PerfilContainer>
        <PortadaContainer>
          <Portada src={ImgPortada} alt="portada" />
        </PortadaContainer>
        <ImgPerfil src={imgPerfil} />
        <EditarPerfil>Editar Perfil</EditarPerfil>
        <InfoPerfil>
          <h2>Rick Sanchez</h2>
          <span>@RickSanchez</span>
          <p>Detalles de mi perfil</p>
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
      <TweetsNavbar />
      <Tweet />
    </PerfilWrapper>
  );
};

export default Perfil;