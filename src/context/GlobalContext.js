import React, { useState, useContext } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  getRedirectResult,
} from "firebase/auth";
import { useEffect } from "react/cjs/react.development";

const GlobalContext = React.createContext();

const AppProvider = ({ children }) => {
  const [usuarioLogueado, setUsuarioLogueado] = useState({});
  const [emailLogueado, setEmailLogueado] = useState("");
  const [datosUser, setDatosUser] = useState({}); //Usuario Logueado

  const user = auth.currentUser;
  onAuthStateChanged(auth, (currentUser) => {
    setUsuarioLogueado(currentUser);
  });

  useEffect(() => {
    const getDatosUsuario = async () => {
      if (user !== null) {
        const email = user.email;
        setEmailLogueado(email);
        const [name, mail] = String(email).split("@");
        const ruta = name;
        const docRef = doc(db, "usuarios", email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data());
          const detallesUser = {
            biografia: docSnap.data().biografia,
            nombre: docSnap.data().nombre,
            sitioWeb: docSnap.data().sitioWeb,
            ubicacion: docSnap.data().ubicacion,
            ruta: docSnap.data().ruta,
            siguiendo: docSnap.data().siguiendo,
            seguidores: docSnap.data().seguidores,
          };
          setDatosUser(detallesUser);
        } else {
          //CREACION DE DATOS USER EN FIRESTORE, CON CUENTA DE GOOGLE U OTRAS
          const createDocRef = await setDoc(doc(db, "usuarios", email), {
            nombre: user.displayName,
            mail: user.email,
            emailVerified: user.emailVerified,
            ruta: ruta,
            photoURL: user.photoURL,
            seguidores: [],
            siguiendo: [],
          });
          console.log("No such document!");
        }
      }
    };

    getDatosUsuario();
  }, [usuarioLogueado]);

  return (
    <GlobalContext.Provider
      value={{
        usuarioLogueado,
        emailLogueado,
        datosUser,
        setDatosUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalContext, AppProvider };
