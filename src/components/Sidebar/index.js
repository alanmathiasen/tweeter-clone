import React, { useState } from "react";
import {
    LogoImg,
    ImageLogo,
    Wrapper,
    CardContent,
    Icon,
    UserCard,
    UserInfo,
    ImagenPerfil,
    ModalWrapper,
    UserCardOnModal,
    CerrarSesion,
} from "./Sidebar.styles";
import { Link } from "react-router-dom";

import { HiHome, HiOutlineUser, HiOutlineDotsHorizontal, HiOutlineCheck } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { ButtonColored } from "../Utils/ButtonColored";
import { useGlobalContext } from "../../context/GlobalContext";
import FotoPerfil from "../../imgs/perfil.jpg";
import TweeterLogo from "../../imgs/tweetter-logo.png";
import ModalBase from "../ModalBase";
import TweetForm from "../TweetForm";

const Sidebar = () => {
    const { datosUser } = useGlobalContext();

    const [modalState, setModalState] = useState(false);
    const [tweetModal, setTweetModal] = useState(false);
    const handleModal = () => {
        setModalState(!modalState);
    };

    return (
        <>
            <Wrapper>
                <div>
                    <LogoImg>
                        <Link to="/">
                            <ImageLogo src={TweeterLogo} alt="" />
                        </Link>
                    </LogoImg>
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
                        <Link to={`/${datosUser.ruta}`}>
                            <Icon>
                                <HiOutlineUser />
                            </Icon>
                            Perfil
                        </Link>
                        <ButtonColored children="Tweet" onClick={() => setTweetModal(!tweetModal)} />
                    </ul>
                </div>
                {modalState && auth.currentUser && (
                    <ModalWrapper modalState={modalState}>
                        <UserCardOnModal>
                            <ImagenPerfil
                                src={datosUser.photoURL ? datosUser.photoURL : FotoPerfil}
                                alt="foto de perfil"
                            ></ImagenPerfil>
                            <UserInfo>
                                <h3>{datosUser.nombre}</h3>
                                <p>@{datosUser.ruta}</p>
                            </UserInfo>
                            <span>
                                <HiOutlineCheck />
                            </span>
                        </UserCardOnModal>
                        {auth.currentUser && (
                            <CerrarSesion onClick={() => signOut(auth)}>
                                Cerrar Sesión de @{datosUser.ruta}
                            </CerrarSesion>
                        )}
                    </ModalWrapper>
                )}
                {auth.currentUser && (
                    <UserCard onClick={handleModal}>
                        <CardContent>
                            <ImagenPerfil
                                src={datosUser.photoURL ? datosUser.photoURL : FotoPerfil}
                                alt="foto de perfil"
                                referrerPolicy="no-referrer"
                            ></ImagenPerfil>
                            <UserInfo>
                                <h3>{datosUser.nombre}</h3>
                                <p>@{datosUser.ruta}</p>
                            </UserInfo>
                        </CardContent>
                        <span>
                            <HiOutlineDotsHorizontal />
                        </span>
                    </UserCard>
                )}
            </Wrapper>
            <ModalBase showModal={tweetModal} setShowModal={setTweetModal}>
                <TweetForm className="tweetForm" setShowModal={setTweetModal} />
            </ModalBase>
        </>
    );
};

export default Sidebar;
