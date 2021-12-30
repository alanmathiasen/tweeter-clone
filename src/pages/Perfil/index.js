import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
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
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase/firebaseConfig";

const Perfil = ({ correoUsuario, emailLogueado, datosUser, setDatosUser }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [perfilModalOpen, setPerfilModalOpen] = useState(false);
  const [currentPerfil, setCurrentPerfil] = useState({});
  const [currentPerfilMail, setCurrentPerfilMail] = useState("");
  const [itsCurrentUserProfile, setItsCurrentUserProfile] = useState(false);

  const handlePerfilModal = () => {
    setPerfilModalOpen(!perfilModalOpen);
  };

  const user = auth.currentUser;

  const getDatosPerfil = async () => {
    const usuariosRef = collection(db, "usuarios");
    const currentPerfil = query(usuariosRef, where("ruta", "==", id));

    const querySnapshot = await getDocs(currentPerfil);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setCurrentPerfil(doc.data());
      setCurrentPerfilMail(doc.id);
    });
  };

  const handleItsCurrentUserProfile = () => {
    if (id === datosUser.ruta) {
      setItsCurrentUserProfile(true);
    } else {
      setItsCurrentUserProfile(false);
    }
  };

  useEffect(() => {
    getDatosPerfil();
    handleItsCurrentUserProfile();
  }, [currentPerfil]);

  return (
    <PerfilWrapper>
      <PerfilNav>
        <ButtonBack onClick={() => navigate(-1)}>
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
          </EditarPerfil>
        ) : (
          <EditarPerfil itsCurrentUserProfile={itsCurrentUserProfile}>
            Seguir
          </EditarPerfil>
        )}

        <InfoPerfil>
          <h2>{currentPerfil.nombre}</h2>
          <span>{currentPerfilMail}</span>
          <p>{currentPerfil.biografia}</p>
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
