import React, { useState } from "react";
import { FormWrapper, FormContent } from "./Registro.style";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";

import { useNavigate } from "react-router";

//Métodos de firebase auth.
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithRedirect,
  GoogleAuthProvider,
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
  onAuthStateChanged(auth, (currentUser) => {
    setUsuarioLogueado(currentUser);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      if (estaRegistrado) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      //crea ruta del perfil
      let usuario = String(email);
      const [name, mail] = usuario.split("@");
      const ruta = name;
      const docRef = await updateDoc(doc(db, "usuarios", email), {
        ruta: ruta,
      });

      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <FormWrapper>
        <h3>{estaRegistrado ? "Inicia sesión" : "Registrate"}</h3>
        <FormContent onSubmit={handleSubmit}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Contraseña" name="password" />
          <button type="submit">
            {estaRegistrado ? "Inicia sesión" : "Registrate"}
          </button>
        </FormContent>

        <button
          type="submit"
          onClick={() => signInWithRedirect(auth, googleProvider)}
        >
          Acceder con Google
        </button>

        <button onClick={() => setEstaRegistrado(!estaRegistrado)}>
          {estaRegistrado
            ? "¿No tenes cuenta? Registrate"
            : "¿Ya tenes cuenta? Inicia sesión"}
        </button>
      </FormWrapper>
    </div>
  );
};

export default Registro;
