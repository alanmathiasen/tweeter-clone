import React, { useState } from "react";
import { FormWrapper, InputWrapper } from "./Registro.style";
import { auth } from "../../firebase/firebaseConfig";

//Métodos de firebase auth.
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const Registro = () => {
  const [emailRegistro, setEmailRegistro] = useState("");
  const [contraseñaRegistro, setContraseñaRegistro] = useState("");
  const [emailLogueo, setEmailLogueo] = useState("");
  const [contraseñaLogueo, setContraseñaLogueo] = useState("");

  const [user, setUser] = useState({});

  //Método de firebase, similar a useEffect. Se ejecuta cuando un estado del auth cambia.
  //Toma el currentUser (usuario logueado actualmente) que se encuentra en auth y se lo pasa al state user.
  //Esto se hace para que, cuando se hace un f5 en la página, no tire error, ya que demora un milisegundo
  //en volver en traer desde firebase, al usuario que esta logueado actualmente en la pagina.
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleRegistro = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        emailRegistro,
        contraseñaRegistro
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogueo = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        emailLogueo,
        contraseñaLogueo
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeslogueo = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <FormWrapper>
        <h3>Registrar Usuario</h3>
        <InputWrapper>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmailRegistro(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            onChange={(e) => {
              setContraseñaRegistro(e.target.value);
            }}
          />
        </InputWrapper>
        <button onClick={handleRegistro}>Registrarse</button>
      </FormWrapper>

      <FormWrapper>
        <h3>Loguear Usuario</h3>
        <InputWrapper>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmailLogueo(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            onChange={(e) => {
              setContraseñaLogueo(e.target.value);
            }}
          />
        </InputWrapper>
        <button onClick={handleLogueo}>Login</button>
      </FormWrapper>

      {user && (
        <div>
          <h4>Usuario Logueado</h4>
          {/* user?.email | Si hay un usuario registrado muestra el email, sino no muestra nada. */}
          <p>{user?.email}</p>

          <button onClick={handleDeslogueo}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
};

export default Registro;
