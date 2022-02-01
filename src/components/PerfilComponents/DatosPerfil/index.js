import React, { useState, useEffect } from "react";
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
import { usePerfilContext } from "../../../context/PerfilContext";
import { useGlobalContext } from "../../../context/GlobalContext";
import ImgPortada from "../../../imgs/portada.jpg";
import imgPerfil from "../../../imgs/perfil.jpg";
//ICONS
import { GoLocation } from "react-icons/go";
import { IoIosLink } from "react-icons/io";
import { BsCalendarEvent } from "react-icons/bs";

const DatosPerfil = ({ handlePerfilModal }) => {
  const { id } = useParams();
  const location = useLocation();

  const { datosUser } = useGlobalContext();

  const {
    currentPerfil,
    currentPerfilMail,
    siguiendo,
    seguidores,
    handleFollowButton,
    setHandleFollowButton,
    handleFollow,
    handleLoad,
    setPageItsLoad,
    pageItsLoad,
    getDatosPerfil,
  } = usePerfilContext();

  const [itsCurrentUserProfile, setItsCurrentUserProfile] = useState(false);
  const [btnState, setBtnState] = useState(false);

  const handleClick = () => {
    handleFollow();
    setBtnState(!btnState);
  };

  useEffect(() => {
    setPageItsLoad(false);
    getDatosPerfil(id);
  }, [id]);

  useEffect(() => {
    const checkFollowAlready = () => {
      let mail = String(currentPerfilMail);
      let array = [];
      if (id === datosUser.ruta) {
        setItsCurrentUserProfile(true);
      } else {
        setItsCurrentUserProfile(false);
        if (datosUser.siguiendo) {
          array = datosUser.siguiendo;
          let resp = array.includes(mail);
          if (resp === true) {
            setHandleFollowButton(true);
            console.log("SI SIGUE A USER");
            setBtnState(true);
          } else {
            setHandleFollowButton(false);
            console.log("NO SIGUE A USER");
            setBtnState(false);
          }
        } else {
          return;
        }
      }
    };

    checkFollowAlready();
  }, [datosUser.siguiendo, id, location]);

  if (!pageItsLoad) {
    return <div>cargando</div>;
  }

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
          handleFollowButton={btnState}
          onClick={() => handleClick()}
        >
          {btnState ? "Dejar de seguir" : "Seguir"}
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
