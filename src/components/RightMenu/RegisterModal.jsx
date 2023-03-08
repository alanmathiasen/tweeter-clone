import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import ModalBase from "../Modals/ModalBase";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { ButtonRegister, RegisterForm, RegisterFormTitle } from "./RightMenu.styles";

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
    return (
        <ModalBase showModal={showModal} setShowModal={setShowModal}>
            <RegisterForm>
                <RegisterFormTitle>Crea tu cuenta</RegisterFormTitle>
                <input type="text" />
                <input type="text" />

                <ButtonRegister onClick={() => alert("asd")}>Registrarse</ButtonRegister>
            </RegisterForm>
        </ModalBase>
    );
};

export default RegisterModal;
