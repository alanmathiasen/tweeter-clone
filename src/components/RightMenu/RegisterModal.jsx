import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalBase from "../Modals/ModalBase";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { ButtonRegister, RegisterForm, RegisterFormTitle } from "./RightMenu.styles";
import AnimatedInput from "../common/AnimatedInput";
import { registerUser } from "../../firebase/userCrud";

const RegisterModal = ({ showModal, setShowModal }) => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        //const email = e.target.email.value;
        //const password = e.target.password.value;

        // if (user !== null) {
        try {
            //if (estaRegistrado) {
            //await signInWithEmailAndPassword(auth, email, password);
            //} else {
            //CREACION DE DATOS USER EN FIRESTORE, REGISTRO CON MAIL Y PASS NUEVOS
            const validateErrors = validateForm();
            if (Object.keys(validateErrors).length !== 0) {
                setErrors(validateErrors);
                console.log(validateErrors);
                return;
            }

            alert("REGISTRADO");
            //await registerUser(name, email, password);
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
        // }
    };

    const validateForm = () => {
        let validateErrors = {};
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            validateErrors.email = "Email invalido";
        }
        if (email.length === 0) validateErrors.email = "Debes ingresar un email";
        if (name.length > 50) {
            validateErrors.name = "El nombre no debe superar los 50 caracteres";
        }
        if (name.length === 0) {
            console.log({ name });
            validateErrors.name = "Debes ingresar un nombre";
        }
        if (password.length < 6) {
            validateErrors.password = "El password debe tener mas de 6 caracteres";
        }
        if (password.length === 0) validateErrors.password = "Debes ingresar un password";
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
                <ButtonRegister onClick={handleSubmit}>Registrarse</ButtonRegister>
            </RegisterForm>
        </ModalBase>
    );
};

export default RegisterModal;
