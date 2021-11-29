import React from "react";
import { Wrapper, ButtonTweet, Icon } from "./Sidebar.styles";
import { Link } from "react-router-dom";

import { HiHome, HiOutlineUser } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";

const Sidebar = () => {
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
      </ul>
    </Wrapper>
  );
};

export default Sidebar;
