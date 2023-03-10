import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalBase from "../Modals/ModalBase";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { ButtonRegister, RegisterForm, RegisterFormTitle } from "./RightMenu.styles";
import AnimatedInput from "../common/AnimatedInput";
import { registerUser } from "../../firebase/userCrud";
import { SpanError } from "../common/AnimatedInput/AnimatedInput.styles";

const RegisterModal = ({ showModal, setShowModal }) => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [firebaseError, setFirebaseError] = useState();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (user !== null) {
        try {
            //if (estaRegistrado) {
            //await signInWithEmailAndPassword(auth, email, password);
            //} else {
            //CREACION DE DATOS USER EN FIRESTORE, REGISTRO CON MAIL Y PASS NUEVOS
            const validateErrors = validateForm();
            if (Object.keys(validateErrors).length !== 0) {
                setErrors(validateErrors);
                return;
            }

            await registerUser(name, email, password);
            navigate("/");
        } catch (error) {
            setFirebaseError(error);
        }
        // }
    };

    const validateForm = () => {
        let validateErrors = {};
        if (email.length === 0) validateErrors.email = "Debes ingresar un email";
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) validateErrors.email = "Email invalido";

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
        <ModalBase showModal={showModal} setShowModal={setShowModal}>
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
                {firebaseError && <SpanError>El email ya se encuentra en uso.</SpanError>}
                <ButtonRegister onClick={handleSubmit}>Registrarse</ButtonRegister>
            </RegisterForm>
        </ModalBase>
    );
};

export default RegisterModal;
