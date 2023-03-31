import React from "react";
import { BarWrapper, CenterTxt, LinksBtn, Button } from "./LoginBar.styles";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "../../context/ModalContext";

const LoginBar = () => {
    const { isRegisterModalOpen, setIsRegisterModalOpen, isSigninModalOpen, setIsSigninModalOpen } = useModalContext();

    return (
        <BarWrapper>
            <div></div>
            <CenterTxt>
                <h2>No te pierdas lo que está pasando</h2>
                <p>Los usuarios de Twitter son los primeros en enterarse.</p>
            </CenterTxt>
            <LinksBtn>
                <Button
                    onClick={() => setIsSigninModalOpen(!isSigninModalOpen)}
                    color="#fff"
                    border="1px solid #fff"
                    bg="none"
                    hover="#F7B0B0"
                >
                    Iniciar sesión
                </Button>
                <Button
                    onClick={() => setIsRegisterModalOpen(!isRegisterModalOpen)}
                    color="#000"
                    border="none"
                    bg="#fff"
                    hover="#dedede"
                >
                    Regístrate
                </Button>
            </LinksBtn>
        </BarWrapper>
    );
};

export default LoginBar;
