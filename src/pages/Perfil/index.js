import React, { useState } from "react";
import {
  PerfilWrapper,
  PerfilModalContainer,
  OverlayModal,
} from "./Perfil.styles";
// COMPONENTES
import TweetsNavbar from "../../components/TweetsNavbar";
import Tweet from "../../components/Tweet";
import PerfilModal from "../../components/PerfilComponents/PerfilModal";
import PerfilNav from "../../components/PerfilComponents/PerfilNav";
import DatosPerfil from "../../components/PerfilComponents/DatosPerfil";

const Perfil = () => {
  const [perfilModalOpen, setPerfilModalOpen] = useState(false);

  const handlePerfilModal = () => {
    setPerfilModalOpen(!perfilModalOpen);
  };

  return (
    <PerfilWrapper>
      <PerfilNav />

      <DatosPerfil handlePerfilModal={handlePerfilModal} />

      <OverlayModal
        perfilModalOpen={perfilModalOpen}
        onClick={handlePerfilModal}
      />

      <PerfilModalContainer perfilModalOpen={perfilModalOpen}>
        <PerfilModal handlePerfilModal={handlePerfilModal} />
      </PerfilModalContainer>
      <TweetsNavbar />
      <Tweet />
    </PerfilWrapper>
  );
};

export default Perfil;
