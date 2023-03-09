import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import ModalBase from "../Modals/ModalBase";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { ButtonRegister, RegisterForm, RegisterFormTitle } from "./RightMenu.styles";
import AnimatedInput from "../common/AnimatedInput";

const RegisterModal = ({ showModal, setShowModal }) => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        // if (user !== null) {
        try {
            //if (estaRegistrado) {
            await signInWithEmailAndPassword(auth, email, password);
            //} else {
            //CREACION DE DATOS USER EN FIRESTORE, REGISTRO CON MAIL Y PASS NUEVOS
            const user = await createUserWithEmailAndPassword(auth, email, password);
            let usuario = String(email);
            const [ruta, mail] = usuario.split("@");
            const docRef = await setDoc(doc(db, "usuarios", email), {
                ruta: ruta,
                email: email,
                seguidores: [],
                siguiendo: [],
            });
            //}
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
        // }
    };

    const testSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
    };

    return (
        <ModalBase showModal={showModal} setShowModal={setShowModal}>
            <RegisterForm onSubmit={testSubmit} action="#">
                <RegisterFormTitle>Crea tu cuenta</RegisterFormTitle>
                <AnimatedInput title="Nombre" />
                <AnimatedInput title="Email" type="email" />
                <AnimatedInput title="Password" type="password" />
                <button type="submit">SUBMITELCDTM</button>
                <ButtonRegister type="submit">Registrarse</ButtonRegister>
            </RegisterForm>
        </ModalBase>
    );
};

export default RegisterModal;
