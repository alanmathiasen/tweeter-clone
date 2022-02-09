import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

import { useGlobalContext } from "./GlobalContext";

const PerfilContext = React.createContext();

const PerfilProvider = ({ children }) => {
  const { emailLogueado, datosUser, setDatosUser } = useGlobalContext();

  const [currentPerfil, setCurrentPerfil] = useState({}); //Ruta de usuario actual, no el logueado
  const [currentPerfilMail, setCurrentPerfilMail] = useState("");
  const [siguiendo, setSiguiendo] = useState(0);
  const [seguidores, setSeguidores] = useState(0);
  const [pageItsLoad, setPageItsLoad] = useState(true);
  const [handleFollowButton, setHandleFollowButton] = useState(true);

  const getDatosPerfil = useCallback(async (id) => {
    const usuariosRef = collection(db, "usuarios");
    const currentPerfil = query(usuariosRef, where("ruta", "==", id));

    const querySnapshot = await getDocs(currentPerfil);
    querySnapshot.forEach((doc) => {
      setCurrentPerfil(doc.data());
      setCurrentPerfilMail(doc.id);
      if (doc.data().siguiendo) {
        setSiguiendo(doc.data().siguiendo.length);
      } else {
        setSiguiendo(0);
      }
      if (doc.data().seguidores) {
        setSeguidores(doc.data().seguidores.length);
      } else {
        setSeguidores(0);
      }
    });
    setPageItsLoad(true);
  }, []);

  const handleLoad = useCallback(() => {
    if (currentPerfilMail) {
      setPageItsLoad(true);
    }
  }, []);

  const handleFollow = async (id) => {
    setHandleFollowButton(!handleFollowButton);
    let mailASeguir = currentPerfilMail;
    if (mailASeguir) {
      if (id) {
        let boolean = datosUser.siguiendo.includes(id);

        if (boolean === true) {
          const logguedUserRef = await updateDoc(
            doc(db, "usuarios", emailLogueado),
            {
              siguiendo: arrayRemove(id),
            }
          );
          const seguidoRef = await updateDoc(doc(db, "usuarios", id), {
            seguidores: arrayRemove(emailLogueado),
          });
          //UPDATE LOCAL USER STATE
          const newArray = datosUser.siguiendo.filter((item) => item !== id);
          setDatosUser({ ...datosUser, siguiendo: newArray });
        } else {
          const logguedUserRef = await updateDoc(
            doc(db, "usuarios", emailLogueado),
            {
              siguiendo: arrayUnion(id),
            }
          );

          const seguidoRef = await updateDoc(doc(db, "usuarios", id), {
            seguidores: arrayUnion(emailLogueado),
          });
          //UPDATE LOCAL USER STATE
          setDatosUser({
            ...datosUser,
            siguiendo: [...datosUser.siguiendo, id],
          });
        }
      } else {
        if (handleFollowButton) {
          const logguedUserRef = await updateDoc(
            doc(db, "usuarios", emailLogueado),
            {
              siguiendo: arrayRemove(mailASeguir),
            }
          );
          const seguidoRef = await updateDoc(doc(db, "usuarios", mailASeguir), {
            seguidores: arrayRemove(emailLogueado),
          });
          //UPDATE LOCAL USER STATE
          const newArray = datosUser.siguiendo.filter(
            (item) => item !== mailASeguir
          );
          setDatosUser({ ...datosUser, siguiendo: newArray });
        } else {
          const logguedUserRef = await updateDoc(
            doc(db, "usuarios", emailLogueado),
            {
              siguiendo: arrayUnion(mailASeguir),
            }
          );

          const seguidoRef = await updateDoc(doc(db, "usuarios", mailASeguir), {
            seguidores: arrayUnion(emailLogueado),
          });
          //UPDATE LOCAL USER STATE
          setDatosUser({
            ...datosUser,
            siguiendo: [...datosUser.siguiendo, mailASeguir],
          });
        }
      }
    }
  };

  // const handleFollowPage = async (id) => {
  //   if (id) {
  //     const logguedUserRef = await updateDoc(
  //       doc(db, "usuarios", emailLogueado),
  //       {
  //         siguiendo: arrayRemove(id),
  //       }
  //     );
  //     const seguidoRef = await updateDoc(doc(db, "usuarios", id), {
  //       seguidores: arrayRemove(emailLogueado),
  //     });
  //   }
  // };

  return (
    <PerfilContext.Provider
      value={{
        getDatosPerfil,
        currentPerfil,
        currentPerfilMail,
        siguiendo,
        seguidores,
        pageItsLoad,
        setPageItsLoad,
        handleLoad,
        setHandleFollowButton,
        handleFollow,
        // handleFollowPage,
      }}
    >
      {children}
    </PerfilContext.Provider>
  );
};
export const usePerfilContext = () => {
  return useContext(PerfilContext);
};

export { PerfilContext, PerfilProvider };
