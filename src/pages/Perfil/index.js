import React, { useState } from "react";
import { PerfilWrapper, PerfilModalContainer, OverlayModal } from "./Perfil.styles";
// COMPONENTES
import TweetsNavbar from "../../components/TweetsNavbar";
import TweetHome from "../../components/TweetHome";
import PerfilModal from "../../components/PerfilComponents/PerfilModal";
import PerfilNav from "../../components/PerfilComponents/PerfilNav";
import DatosPerfil from "../../components/PerfilComponents/DatosPerfil";
import TweetsPerfil from "../../components/PerfilComponents/TweetsPerfil";
import { usePerfilContext } from "../../context/PerfilContext";
import { Outlet } from "react-router-dom";

const Perfil = () => {
    const [perfilModalOpen, setPerfilModalOpen] = useState(false);
    const { currentPerfilMail } = usePerfilContext();

    const handlePerfilModal = () => {
        setPerfilModalOpen(!perfilModalOpen);
    };

    return (
        <PerfilWrapper>
            <PerfilNav />

            <DatosPerfil handlePerfilModal={handlePerfilModal} />

            <OverlayModal perfilModalOpen={perfilModalOpen} onClick={handlePerfilModal} />

            <PerfilModalContainer perfilModalOpen={perfilModalOpen}>
                <PerfilModal handlePerfilModal={handlePerfilModal} />
            </PerfilModalContainer>
            <Outlet />
            <TweetsNavbar />
            <TweetsPerfil />
        </PerfilWrapper>
    );
};

export default Perfil;
