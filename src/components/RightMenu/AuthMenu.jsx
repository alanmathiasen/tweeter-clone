import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { ButtonOutline } from "../common/buttons.styles";
import GoogleSVG from "../common/GoogleSVG";
import RegisterModal from "./RegisterModal";
import { AuthWrapper, ButtonGroup, Title } from "./RightMenu.styles";

const AuthMenu = () => {
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const navigate = useNavigate();

    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider);
        navigate("/");
    };

    return (
        <AuthWrapper>
            <Title>¿Eres nuevo en Tweeter?</Title>
            <div>Regístrate ahora para obtener tu propia cronología personalizada.</div>
            <ButtonGroup>
                <ButtonOutline onClick={signInWithGoogle}>
                    <GoogleSVG width="20px" height="20px" /> Registrarse con Google
                </ButtonOutline>
                <ButtonOutline onClick={() => setShowRegisterModal(!showRegisterModal)}>Crear cuenta</ButtonOutline>
            </ButtonGroup>
            <div>Al registrarte, aceptas un monton de cosas.</div>
            <RegisterModal showModal={showRegisterModal} setShowModal={setShowRegisterModal}></RegisterModal>
        </AuthWrapper>
    );
};

export default AuthMenu;
