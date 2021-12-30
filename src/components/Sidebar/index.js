import React, { useState, useEffect } from "react";
import { Wrapper, ButtonTweet, Icon } from "./Sidebar.styles";
import { Link } from "react-router-dom";

import { HiHome, HiOutlineUser } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

const Sidebar = ({ correoUsuario }) => {
  const handleModal = () => {};
  const [usuarioSinArroba, setUsuarioSinArroba] = useState("");

  let usuario = String(correoUsuario);
  const [name, email] = usuario.split("@");

  return (
    <Wrapper>
      <ul>
        <Link to="/">
          <Icon>
            <HiHome />
          </Icon>
          Inicio
        </Link>
        <Link to="/notificaciones">
          <Icon>
            <IoNotificationsOutline />
          </Icon>
          Notificaciones
        </Link>
        <Link to={`/${name}`}>
          <Icon>
            <HiOutlineUser />
          </Icon>
          Perfil
        </Link>
        <ButtonTweet onClick={handleModal}>Tweet</ButtonTweet>

        {auth.currentUser && (
          <button onClick={() => signOut(auth)}>Cerrar Sesión</button>
        )}
      </ul>
    </Wrapper>
  );
};

export default Sidebar;
