import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import GoogleSVG from "../common/GoogleSVG";
import RegisterModal from "./RegisterModal";
import { AuthWrapper, ButtonGroup, Title, ButtonRegister } from "./RightMenu.styles";
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
                <ButtonRegister onClick={handleSignInWithGoogle}>
                    <GoogleSVG width="20px" height="20px" /> Registrarse con Google
                </ButtonRegister>
                <ButtonRegister onClick={() => setShowRegisterModal(!showRegisterModal)}>Crear cuenta</ButtonRegister>
            </ButtonGroup>
            <div>Al registrarte, aceptas un monton de cosas.</div>
            <RegisterModal showModal={showRegisterModal} setShowModal={setShowRegisterModal}></RegisterModal>
        </AuthWrapper>
    );
};

export default AuthMenu;
