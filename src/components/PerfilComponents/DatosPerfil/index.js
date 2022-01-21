import React from "react";
import { useNavigate } from "react-router";
import { useParams, useLocation, Link } from "react-router-dom";
import {
  PerfilContainer,
  PortadaContainer,
  Portada,
  ImgPerfil,
  EditarPerfil,
  InfoPerfil,
  SeguidoresYSeguidosWrapper,
  SeguidoresYSeguidos,
  AllLinksWrapper,
  LinkWrapper,
  InfoIcon,
} from "./DatosPerfil.styles";
import { useGlobalContext } from "../../../context/Context";

import ImgPortada from "../../../imgs/portada.jpg";
import imgPerfil from "../../../imgs/perfil.jpg";
//ICONS
import { GoLocation } from "react-icons/go";
import { IoIosLink } from "react-icons/io";
import { BsCalendarEvent } from "react-icons/bs";

const DatosPerfil = ({
  itsCurrentUserProfile,
  handlePerfilModal,
  handleFollowButton,
  handleFollow,
}) => {
  const { id } = useParams();
  const { currentPerfil, currentPerfilMail, siguiendo, seguidores } =
    useGlobalContext();

  return (
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
            <Link to={`/${id}/siguiendo`}>
              <span>{siguiendo}</span>
              Siguiendo
            </Link>
          </SeguidoresYSeguidos>
          <SeguidoresYSeguidos>
            <Link to={`/${id}/seguidores`}>
              <span>{seguidores}</span>Seguidores
            </Link>
          </SeguidoresYSeguidos>
        </SeguidoresYSeguidosWrapper>
      </InfoPerfil>
    </PerfilContainer>
  );
};

export default DatosPerfil;
