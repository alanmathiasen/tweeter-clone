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

  const getDatosPerfil = async () => {
    const usuariosRef = collection(db, "usuarios");
    const currentPerfil = query(usuariosRef, where("ruta", "==", id));

    const querySnapshot = await getDocs(currentPerfil);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      setCurrentPerfil(doc.data());
      setCurrentPerfilMail(doc.id);
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
  };

  const checkFollowAlready = () => {
    let mail = String(currentPerfilMail);
    let arr = [];
    if (datosUser.siguiendo) {
      arr = datosUser.siguiendo;
      console.log(arr);
    }
    if (arr) {
      let respuesta = arr.includes(mail);
      if (respuesta === true) {
        setHandleFollowButton(true);
      } else {
        setHandleFollowButton(false);
      }
    } else {
      setHandleFollowButton(false);
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
    getDatosPerfil();
    handleItsCurrentUserProfile();
    checkFollowAlready();
  }, [location]);

  useEffect(() => {
    checkFollowAlready();
  }, [currentPerfilMail]);

  // useEffect(() => {
  //   getDatosUsuario();
  //   getDatosPerfil();
  // }, [handleFollowButton]);

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
          </EditarPerfil>
        ) : (
          <EditarPerfil
            itsCurrentUserProfile={itsCurrentUserProfile}
            handleFollowButton={handleFollowButton}
            onClick={handleFollow}
          >
            {handleFollowButton ? "Dejar de seguir" : "Seguir"}
          </EditarPerfil>
        )}

        <InfoPerfil>
          <h2>{currentPerfil.nombre}</h2>
          <span>{currentPerfilMail}</span>
          <p>{currentPerfil.biografia}</p>
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
