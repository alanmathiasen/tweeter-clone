import React from "react";
import { PerfilNavbar, ButtonBack, NavInfo } from "./PerfilNav.styles";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router";
import { useGlobalContext } from "../../../context/Context";

const PerfilNav = () => {
  const navigate = useNavigate();
  const { currentPerfil } = useGlobalContext();

  return (
    <PerfilNavbar>
      <ButtonBack onClick={() => navigate(-1)}>
        <BiArrowBack />
      </ButtonBack>
      <NavInfo>
        <h3>{currentPerfil.nombre}</h3>
        <p>250 Tweets</p>
      </NavInfo>
    </PerfilNavbar>
  );
};

export default PerfilNav;
