import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseModal from "../Modals/BaseModal";
import {
    ButtonRegister,
    RegisterForm,
    RegisterFormTitle,
    GoToLogin,
    ModalAuthWrapper,
    ModalTitle,
    LogoWrapper,
} from "./RightMenu.styles";
import AnimatedInput from "../common/AnimatedInput";
import { registerUser } from "../../firebase/userCrud";
import { SpanError } from "../common/AnimatedInput/AnimatedInput.styles";
import { registerWithEmailAndPassword } from "../../firebase/auth";
import { useModalContext } from "../../context/ModalContext";
import Logo from "../common/Logo";

const RegisterModal = ({ showModal, setShowModal }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState();
    const { isRegisterModalOpen, setIsRegisterModalOpen, setIsSigninModalOpen } = useModalContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validateErrors = validateForm();
            if (Object.keys(validateErrors).length !== 0) {
                setErrors(validateErrors);
                return;
            }

            await registerWithEmailAndPassword(username, email, password);
            setIsRegisterModalOpen(false);
            navigate("/");
        } catch (error) {
            if (error.code === "auth/email-already-in-use") setErrorMessage("El email ya se encuentra en uso.");
            if (error.message === "El nombre de usuario ya existe.") setErrorMessage("El nombre de usuario ya existe.");
        }
        // }
    };

    const validateForm = () => {
        let validateErrors = {};
        if (email.length === 0) validateErrors.email = "Debes ingresar un email";
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) validateErrors.email = "Email invalido";

        if (username.length === 0) validateErrors.username = "Debes ingresar un nombre";
        if (username.length > 50) validateErrors.username = "El nombre no debe superar los 50 caracteres";

        if (password.length === 0) validateErrors.password = "Debes ingresar un password";
        if (password.length < 6) validateErrors.password = "El password debe tener mas de 6 caracteres";

        return validateErrors;
    };

    const handleChange = (target, setValue) => {
        if (Object.keys(errors) !== 0) {
            const newErrors = { ...errors };
            delete newErrors[target.username];
            setErrors(newErrors);
        }
        setValue(target.value);
    };

    const handleShowSignin = (e) => {
        e.stopPropagation();
        setIsRegisterModalOpen(false);
        setIsSigninModalOpen(true);
    };

    return (
        <BaseModal showModal={showModal} setShowModal={setShowModal}>
            <ModalAuthWrapper>
                <LogoWrapper>
                    <Logo />
                </LogoWrapper>
                <ModalTitle>Unite hoy a Tweeter</ModalTitle>
                <RegisterForm>
                    <AnimatedInput
                        title="Nombre de usuario"
                        name="username"
                        value={username}
                        onChange={(e) => handleChange(e.target, setUsername)}
                        error={errors.username}
                    />
                    <AnimatedInput
                        title="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => handleChange(e.target, setEmail)}
                        error={errors.email}
                    />
                    <AnimatedInput
                        title="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => handleChange(e.target, setPassword)}
                        error={errors.password}
                    />
                    {errorMessage && (
                        <SpanError>
                            <span>{errorMessage}</span>{" "}
                        </SpanError>
                    )}
                    <ButtonRegister onClick={handleSubmit}>Registrarse</ButtonRegister>
                </RegisterForm>
                <GoToLogin>
                    Ya tienes una cuenta? <span onClick={handleShowSignin}>Inicia sesión</span>
                </GoToLogin>
            </ModalAuthWrapper>
        </BaseModal>
    );
};

export default RegisterModal;
