import React from "react";

import { useModalContext } from "../../context/ModalContext";

import GoogleButton from "../common/Buttons/GoogleButton";
import { AuthWrapper, ButtonGroup, Title, ButtonRegister } from "./RightMenu.styles";

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
