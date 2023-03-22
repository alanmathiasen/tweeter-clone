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
import { ButtonColored } from "../common/ButtonColored";
import { useGlobalContext } from "../../context/GlobalContext";
import FotoPerfil from "../../imgs/perfil.jpg";
import TweeterLogo from "../../imgs/tweetter-logo.png";
import BaseModal from "../Modals/BaseModal";
import TweetForm from "../TweetForm";
import { limitString } from "../../helpers/stringHelper";

const Sidebar = () => {
    const { userData } = useGlobalContext();
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
                        {/* <Link to={`/${userData.route}`}>
                            <Icon>
                                <HiOutlineUser />
                            </Icon>
                            Perfil
                        </Link> */}
                        <ButtonColored children="Tweet" onClick={() => setTweetModal(!tweetModal)} />
                    </ul>
                </div>
                {auth.currentUser && userData && (
                    <UserCard onClick={handleModal}>
                        <CardContent>
                            <ImagenPerfil
                                src={userData.photoURL ? userData.photoURL : FotoPerfil}
                                alt="foto de perfil"
                                referrerPolicy="no-referrer"
                            ></ImagenPerfil>
                            <UserInfo>
                                <h3>{userData.nombre}</h3>
                                <p>@{userData.route && limitString(userData.route, 16)}</p>
                            </UserInfo>
                        </CardContent>
                        <HiOutlineDotsHorizontal />
                    </UserCard>
                )}
                {modalState && auth.currentUser && userData && (
                    <ModalWrapper modalState={modalState}>
                        {auth.currentUser && (
                            <CerrarSesion onClick={() => signOut(auth)}>
                                Cerrar Sesión de @{userData.route}
                            </CerrarSesion>
                        )}
                    </ModalWrapper>
                )}
            </Wrapper>
            <BaseModal showModal={tweetModal} setShowModal={setTweetModal}>
                <TweetForm className="tweetForm" setShowModal={setTweetModal} />
            </BaseModal>
        </>
    );
};

export default Sidebar;
