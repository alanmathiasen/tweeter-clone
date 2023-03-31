import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import GoogleSVG from "../common/GoogleSVG";
import RegisterModal from "./RegisterModal";
import { AuthWrapper, ButtonGroup, Title, ButtonRegister } from "./RightMenu.styles";
import { signInWithGoogle } from "../../firebase/auth";
import { useModalContext } from "../../context/ModalContext";
import GoogleButton from "../common/Buttons/GoogleButton";

const AuthMenu = () => {
    const { isRegisterModalOpen, setIsRegisterModalOpen } = useModalContext();

    return (
        <AuthWrapper>
            <Title>¿Eres nuevo en Tweeter?</Title>
            <div>Regístrate ahora para obtener tu propia cronología personalizada.</div>
            <ButtonGroup>
                <GoogleButton>Registrarse con Google</GoogleButton>
                <ButtonRegister onClick={() => setIsRegisterModalOpen(!isRegisterModalOpen)}>
                    Crear cuenta
                </ButtonRegister>
            </ButtonGroup>
            <div>Al registrarte, aceptas un monton de cosas.</div>
        </AuthWrapper>
    );
};

export default AuthMenu;
