import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseModal from "../Modals/BaseModal";
import { LogoWrapper, ModalAuthWrapper, ModalTitle } from "./RightMenu.styles";

import Logo from "../common/Logo";
import GoogleButton from "../common/Buttons/GoogleButton";
import Separator from "../common/Separator";
import SigninForm from "../Auth/SigninForm";

const SigninModal = ({ showModal, setShowModal }) => {
    return (
        <BaseModal showModal={showModal} setShowModal={setShowModal}>
            <ModalAuthWrapper>
                <LogoWrapper>
                    <Logo />
                </LogoWrapper>
                <ModalTitle>Inicia sesión en Tweeter</ModalTitle>
                <GoogleButton>Iniciar sesión con Google</GoogleButton>
                <Separator>ó</Separator>
                <SigninForm />
            </ModalAuthWrapper>
        </BaseModal>
    );
};

export default SigninModal;
