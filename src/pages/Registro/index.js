import React, { useState } from "react";
import {
  FormWrapper,
  FormContent,
  Campo,
  ButtonWrapper,
  ChangeWrapper,
  ImageLogo,
  ButtonGoogle,
} from "./Registro.style";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

import { useNavigate } from "react-router";
//Métodos de firebase auth.
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from "firebase/auth";
import { ButtonColored } from "../../components/Utils/ButtonColored";
import TweetterLogo from "../../imgs/tweetter-logo.png";
import LogoGoogle from "../../imgs/logo-google-png.png";

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
    const nombre = e.target.name.value;

    // if (user !== null) {
    try {
      if (estaRegistrado) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        //CREACION DE DATOS USER EN FIRESTORE, REGISTRO CON MAIL Y PASS NUEVOS
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        let usuario = String(email);
        const [name, mail] = usuario.split("@");
        const ruta = name;
        if (!nombre) {
          nombre = name;
        }
        const docRef = await setDoc(doc(db, "usuarios", email), {
          ruta: ruta,
          email: email,
          nombre: nombre,
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

  const signInWithGoogle = () => {
    signInWithRedirect(auth, googleProvider);
    navigate("/");
  };

  return (
    <div>
      <FormWrapper>
        <ImageLogo src={TweetterLogo} />
        <h3>{estaRegistrado ? "Inicia sesión" : "Registrate"}</h3>
        <FormContent onSubmit={handleSubmit}>
          <Campo type="text" placeholder="Email" name="email" />
          <Campo type="password" placeholder="Contraseña" name="password" />
          {!estaRegistrado && (
            <Campo type="text" placeholder="Nombre" name="name" />
          )}
          <ButtonWrapper>
            <ButtonColored maxWidth="1200px" type="submit">
              {estaRegistrado ? "Inicia sesión" : "Registrate"}
            </ButtonColored>
          </ButtonWrapper>
        </FormContent>

        <ButtonGoogle type="submit" onClick={() => signInWithGoogle()}>
          <img src={LogoGoogle} />
          {estaRegistrado
            ? "Iniciar sesión con Google"
            : "Registrarse con Google"}
        </ButtonGoogle>

        {/* <button type="submit" onClick={() => signInWithGoogle()}>
          Acceder con Google
        </button> */}
        {estaRegistrado ? (
          <ChangeWrapper>
            <p>¿No tenes cuenta?</p>
            <button onClick={() => setEstaRegistrado(!estaRegistrado)}>
              Registrate
            </button>
          </ChangeWrapper>
        ) : (
          <ChangeWrapper>
            <p>¿Ya tenes cuenta?</p>
            <button onClick={() => setEstaRegistrado(!estaRegistrado)}>
              Inicia sesión
            </button>
          </ChangeWrapper>
        )}
      </FormWrapper>
    </div>
  );
};

export default Registro;
