import React, { useState } from "react";
import { Wrapper, ButtonTweet, Icon } from "./Sidebar.styles";
import { Link } from "react-router-dom";

import { HiHome, HiOutlineUser } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { ButtonColored } from "../Utils/ButtonColored";
import { useGlobalContext } from "../../context/GlobalContext";

const Sidebar = () => {
  const { emailLogueado } = useGlobalContext();

  let usuario = String(emailLogueado);
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
        <ButtonColored children="Tweet" />

        {auth.currentUser && (
          <button onClick={() => signOut(auth)}>Cerrar Sesión</button>
        )}
      </ul>
    </Wrapper>
  );
};

export default Sidebar;
