import React, { useState } from "react";
import { FormWrapper, FormContent } from "./Registro.style";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
//TODO DELETE ALL THIS?
import { useNavigate } from "react-router";
//Métodos de firebase auth.
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    getRedirectResult,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const Registro = () => {
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
            throw error;
        }
        // }
    };

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider);
        navigate("/");
    };

    return (
        <div>
            <FormWrapper>
                <h3>{estaRegistrado ? "Inicia sesión" : "Registrate"}</h3>
                <FormContent onSubmit={handleSubmit}>
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Contraseña" name="password" />
                    <button type="submit">{estaRegistrado ? "Inicia sesión" : "Registrate"}</button>
                </FormContent>

                <button type="submit" onClick={signInWithGoogle}>
                    Acceder con Google
                </button>

                <button onClick={() => setEstaRegistrado(!estaRegistrado)}>
                    {estaRegistrado ? "¿No tenes cuenta? Registrate" : "¿Ya tenes cuenta? Inicia sesión"}
                </button>
            </FormWrapper>
        </div>
    );
};

export default Registro;
