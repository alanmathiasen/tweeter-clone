import React, { useState } from "react";
import { Wrapper, ButtonTweet, Icon } from "./Sidebar.styles";
import { Link } from "react-router-dom";

import { HiHome, HiOutlineUser } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

const Sidebar = () => {
  const [usuarioLogueado, setUsuarioLogueado] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUsuarioLogueado(currentUser);
  });
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
        <Link to="/perfil">
          <Icon>
            <HiOutlineUser />
          </Icon>
          Perfil
        </Link>
        <ButtonTweet>Tweet</ButtonTweet>

        {auth.currentUser && (
          <button onClick={() => signOut(auth)}>Cerrar Sesión</button>
        )}
      </ul>
    </Wrapper>
  );
};

export default Sidebar;
