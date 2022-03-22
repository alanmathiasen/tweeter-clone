import React, { useState, useEffect } from "react";
import {
  ModalWrapper,
  ModalNav,
  CloseBtn,
  ButtonGuardar,
  FormWrapper,
  Campo,
  LabelIcon,
} from "./PerfilModal.styles";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase/firebaseConfig";
import { VscClose } from "react-icons/vsc";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import PortadaByDefault from "../../../imgs/userPortada.jpg";
import PerfilByDefault from "../../../imgs/userPerfil.jpg";
import {
  PortadaContainer,
  Portada,
  ImgPerfil,
} from "../DatosPerfil/DatosPerfil.styles";
import { MdPhotoCameraBack } from "react-icons/md";

const PerfilModal = ({ handlePerfilModal }) => {
  const { emailLogueado, datosUser, setDatosUser, imagePerfil } =
    useGlobalContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [portadaUrl, setPortadaUrl] = useState(null);
  const [perfilUrl, setPerfilUrl] = useState(null);

  const handleChange = (e) => {
    setDatosUser({
      ...datosUser,
      [e.target.id]: e.target.value,
    });
  };

  const handleEditarPerfil = async (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const biografia = e.target.biografia.value;
    const ubicacion = e.target.ubicacion.value;
    const sitioWeb = e.target.sitioWeb.value;

    let usuario = String(emailLogueado);
    const [name, email] = usuario.split("@");
    const ruta = name;

    const docRef = await updateDoc(doc(db, "usuarios", emailLogueado), {
      nombre: nombre,
      biografia: biografia,
      ubicacion: ubicacion,
      sitioWeb: sitioWeb,
      ruta: ruta,
      photoURL: perfilUrl,
      portadaURL: portadaUrl,
    });
    handlePerfilModal();
    // window.location.reload();
    navigate(`/${id}`);
  };

  const onPerfilFileChange = async (e) => {
    let filePerfil = e.target.files[0];
    const storageRef = ref(storage, `${emailLogueado}/${filePerfil.name}`);
    await uploadBytes(storageRef, filePerfil);
    setPerfilUrl(await getDownloadURL(storageRef));
  };

  const onPortadaFileChange = async (e) => {
    let filePortada = e.target.files[0];
    const storageRef = ref(storage, `${emailLogueado}/${filePortada.name}`);
    await uploadBytes(storageRef, filePortada);
    setPortadaUrl(await getDownloadURL(storageRef));
  };
  useEffect(() => {
    if (datosUser.photoURL) {
      setPerfilUrl(datosUser.photoURL);
    }
    if (datosUser.portadaURL) {
      setPortadaUrl(datosUser.portadaURL);
    }
  }, [datosUser]);

  return (
    <ModalWrapper onSubmit={handleEditarPerfil}>
      <ModalNav>
        <CloseBtn type="button" onClick={handlePerfilModal}>
          <VscClose />
        </CloseBtn>
        <h2>Editar Perfil</h2>
        <ButtonGuardar type="submit">Guardar</ButtonGuardar>
      </ModalNav>
      {/* PORTADA */}
      <PortadaContainer>
        {!portadaUrl && <Portada src={PortadaByDefault} alt="Image Portada" />}
        {portadaUrl && (
          <Portada
            src={portadaUrl}
            alt={datosUser.name + "portada"}
            height="100px"
          />
        )}
      </PortadaContainer>
      <Campo type="file" id="fotoPortada" onChange={onPortadaFileChange} />

      {/* AVATAR */}
      {!perfilUrl && <ImgPerfil src={PerfilByDefault} alt="Image Perfil" />}
      {perfilUrl && (
        <ImgPerfil
          src={perfilUrl}
          alt={datosUser.name + "perfil"}
          height="100px"
        />
      )}
      <LabelIcon for="fotoPerfil">
        <span>
          <MdPhotoCameraBack />
        </span>
      </LabelIcon>
      <Campo
        type="file"
        id="fotoPerfil"
        onChange={onPerfilFileChange}
        display="none"
      />

      <FormWrapper>
        <Campo
          type="text"
          placeholder="Nombre"
          id="nombre"
          value={datosUser.nombre}
          onChange={handleChange}
        />
        <Campo
          type="text"
          placeholder="Biografía"
          id="biografia"
          value={datosUser.biografia}
          onChange={handleChange}
        />
        <Campo
          type="text"
          placeholder="Ubicación"
          id="ubicacion"
          value={datosUser.ubicacion}
          onChange={handleChange}
        />
        <Campo
          type="text"
          placeholder="Sitio Web"
          id="sitioWeb"
          value={datosUser.sitioWeb}
          onChange={handleChange}
        />
      </FormWrapper>
    </ModalWrapper>
  );
};

export default PerfilModal;
