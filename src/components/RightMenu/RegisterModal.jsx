import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseModal from "../Modals/BaseModal";
import { ButtonRegister, RegisterForm, RegisterFormTitle } from "./RightMenu.styles";
import AnimatedInput from "../common/AnimatedInput";
import { registerUser } from "../../firebase/userCrud";
import { SpanError } from "../common/AnimatedInput/AnimatedInput.styles";
import { registerWithEmailAndPassword } from "../../firebase/auth";

const RegisterModal = ({ showModal, setShowModal }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validateErrors = validateForm();
            if (Object.keys(validateErrors).length !== 0) {
                setErrors(validateErrors);
                return;
            }

            await registerWithEmailAndPassword(name, email, password);
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

        if (name.length === 0) validateErrors.name = "Debes ingresar un nombre";
        if (name.length > 50) validateErrors.name = "El nombre no debe superar los 50 caracteres";

        if (password.length === 0) validateErrors.password = "Debes ingresar un password";
        if (password.length < 6) validateErrors.password = "El password debe tener mas de 6 caracteres";

        return validateErrors;
    };

    const handleChange = (target, setValue) => {
        if (Object.keys(errors) !== 0) {
            const newErrors = { ...errors };
            delete newErrors[target.name];
            setErrors(newErrors);
        }
        setValue(target.value);
    };

    return (
        <BaseModal showModal={showModal} setShowModal={setShowModal}>
            <RegisterForm>
                <RegisterFormTitle>Crea tu cuenta</RegisterFormTitle>
                <AnimatedInput
                    title="Nombre"
                    name="name"
                    value={name}
                    onChange={(e) => handleChange(e.target, setName)}
                    error={errors.name}
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
        </BaseModal>
    );
};

export default RegisterModal;
