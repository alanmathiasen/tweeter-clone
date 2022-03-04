import React from "react";
import { PerfilNavbar, ButtonBack, NavInfo } from "./PerfilNav.styles";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router";
import { usePerfilContext } from "../../../context/PerfilContext";

const PerfilNav = () => {
  const navigate = useNavigate();
  const { currentPerfil, tweetCount } = usePerfilContext();

  return (
    <PerfilNavbar>
      <ButtonBack onClick={() => navigate(-1)}>
        <BiArrowBack />
      </ButtonBack>
      <NavInfo>
        <h3>{currentPerfil.nombre}</h3>
        <p>{tweetCount} Tweets</p>
      </NavInfo>
    </PerfilNavbar>
  );
};

export default PerfilNav;
