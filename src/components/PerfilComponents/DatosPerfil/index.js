import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
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
import { ButtonSeguir } from "../../Utils/ButtonSeguir";
//ICONS
import { GoLocation } from "react-icons/go";
import { IoIosLink } from "react-icons/io";
import { BsCalendarEvent } from "react-icons/bs";

const DatosPerfil = ({ handlePerfilModal }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { datosUser } = useGlobalContext();

  const {
    currentPerfil,
    currentPerfilMail,
    siguiendo,
    seguidores,
    setHandleFollowButton,
    handleFollow,
    setPageItsLoad,
    pageItsLoad,
    getDatosPerfil,
    setTweetsByUser,
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
          console.log(array);
          console.log(id);
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
  }, [datosUser.siguiendo, id, location, currentPerfilMail]);

  if (!pageItsLoad) {
    return <div>cargando</div>;
  }

  return (
    <PerfilContainer>
      <PortadaContainer>
        <Portada src={ImgPortada} alt="portada" />
      </PortadaContainer>
      {itsCurrentUserProfile ? (
        <ImgPerfil src={datosUser.photoURL} />
      ) : (
        <ImgPerfil src={imgPerfil} />
      )}

      {itsCurrentUserProfile ? (
        <EditarPerfil
          itsCurrentUserProfile={itsCurrentUserProfile}
          onClick={handlePerfilModal}
        >
          Editar Perfil
          {console.log("editar perfil")}
        </EditarPerfil>
      ) : (
        <ButtonSeguir
          itsCurrentUserProfile={itsCurrentUserProfile}
          btnState={btnState}
          maxWidth={"200px"}
          color={btnState ? "#000" : "#fff"}
          bg={btnState ? "#fff" : "#000"}
          contentTxt={btnState ? "Dejar de seguir" : "Seguir"}
          onClick={() => handleClick()}
        >
          <span>{btnState ? "Siguiendo" : "Seguir"}</span>
        </ButtonSeguir>
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
            <div onClick={() => navigate("/" + id + "/siguiendo")}>
              {/* <Link to={`/${id}/siguiendo`}> */}
              <span>{siguiendo}</span>
              Siguiendo
              {/* </Link> */}
            </div>
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
