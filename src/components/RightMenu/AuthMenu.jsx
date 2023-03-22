import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ButtonOutline } from "../common/buttons.styles";
import GoogleSVG from "../common/GoogleSVG";
import RegisterModal from "./RegisterModal";
import { AuthWrapper, ButtonGroup, Title } from "./RightMenu.styles";
import { signInWithGoogle } from "../../firebase/auth";

const AuthMenu = () => {
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleSignInWithGoogle = async () => {
        try {
            await signInWithGoogle();
        } catch (err) {
            //TODO HANDLE ERROR
            alert(err);
        }
    };

    return (
        <AuthWrapper>
            <Title>¿Eres nuevo en Tweeter?</Title>
            <div>Regístrate ahora para obtener tu propia cronología personalizada.</div>
            <ButtonGroup>
                <ButtonOutline onClick={handleSignInWithGoogle}>
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
