import React, { useState, useContext, useEffect } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase/firebaseConfig";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  getRedirectResult,
} from "firebase/auth";
import { getDownloadURL, ref } from "firebase/storage";

const GlobalContext = React.createContext();

const AppProvider = ({ children }) => {
  const [usuarioLogueado, setUsuarioLogueado] = useState({});
  const [emailLogueado, setEmailLogueado] = useState("");
  const [datosUser, setDatosUser] = useState({}); //Usuario Logueado
  const [tweettModal, setTweettModal] = useState(false);

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
            photoURL: docSnap.data().photoURL,
            portadaURL: docSnap.data().portadaURL,
            email: docSnap.data().email,
          };
          setDatosUser(detallesUser);
        } else {
          //CREACION DE DATOS USER EN FIRESTORE, CON CUENTA DE GOOGLE U OTRAS
          const createDocRef = await setDoc(doc(db, "usuarios", email), {
            nombre: user.displayName,
            email: user.email,
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

  const handleTweettModal = () => {
    setTweettModal(!tweettModal);
  };

  return (
    <GlobalContext.Provider
      value={{
        usuarioLogueado,
        emailLogueado,
        datosUser,
        setDatosUser,
        tweettModal,
        setTweettModal,
        handleTweettModal,
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
