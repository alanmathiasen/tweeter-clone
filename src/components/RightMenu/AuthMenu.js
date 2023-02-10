import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebaseConfig";
import GoogleSVG from "../common/GoogleSVG";
import { AuthButton, AuthWrapper, Buttons, SignUpButton, Title } from "./RightMenu.styles";
const googleProvider = new GoogleAuthProvider();

const AuthMenu = () => {
    const [estaRegistrado, setEstaRegistrado] = useState(false);

    const navigate = useNavigate();
    const [usuarioLogueado, setUsuarioLogueado] = useState({});

    // //Método de firebase, similar a useEffect. Se ejecuta cuando un estado del auth cambia.
    // //Toma el currentUser (usuario logueado actualmente) que se encuentra en auth y se lo pasa al state user.
    // //Esto se hace para que, cuando se hace un f5 en la página, no tire error, ya que demora un milisegundo
    // //en volver en traer desde firebase, al usuario que esta logueado actualmente en la pagina.
    const user = auth.currentUser;
    onAuthStateChanged(auth, (currentUser) => {
        setUsuarioLogueado(currentUser);
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        // if (user !== null) {
        try {
            if (estaRegistrado) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
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
            }
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
        // }
    };

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider);
        navigate("/");
    };
    return (
        <AuthWrapper>
            <Title>¿Eres nuevo en Tweeter?</Title>
            <div>Regístrate ahora para obtener tu propia cronología personalizada.</div>
            <Buttons>
                <SignUpButton>
                    <GoogleSVG width="20px" height="20px" /> Registrarse con Google
                </SignUpButton>
                <SignUpButton>Crear cuenta</SignUpButton>
            </Buttons>
            <div>Al registrarte, aceptas un monton de cosas.</div>
        </AuthWrapper>
    );
};

export default AuthMenu;
