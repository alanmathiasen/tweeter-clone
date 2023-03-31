import React from "react";
import { useModalContext } from "../../context/ModalContext";
import RegisterModal from "../RightMenu/RegisterModal";
import SigninModal from "../RightMenu/SignInModal";

const Modals = () => {
    const { isRegisterModalOpen, setIsRegisterModalOpen, isSigninModalOpen, setIsSigninModalOpen } = useModalContext();

    return (
        <>
            <RegisterModal showModal={isRegisterModalOpen} setShowModal={setIsRegisterModalOpen} />
            <SigninModal showModal={isSigninModalOpen} setShowModal={setIsSigninModalOpen} />
        </>
    );
};

export default Modals;
