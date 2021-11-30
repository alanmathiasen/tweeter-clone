import React from "react";
import { useNavigate } from "react-router";
import { PerfilWrapper, ButtonBack, PerfilNav, NavInfo } from "./Perfil.styles";
import { BiArrowBack } from "react-icons/bi";

const Perfil = () => {
  const navigate = useNavigate();

  return (
    <PerfilWrapper>
      <PerfilNav>
        <ButtonBack onClick={() => navigate(-1)}>
          <BiArrowBack />
        </ButtonBack>
        <NavInfo>
          <h3>Mi Perfil</h3>
          <p>250 Tweets</p>
        </NavInfo>
      </PerfilNav>
    </PerfilWrapper>
  );
};

export default Perfil;
