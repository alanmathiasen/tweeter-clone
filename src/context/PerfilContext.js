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
import { useLocation, useParams } from "react-router-dom";
import { useGlobalContext } from "./GlobalContext";

const PerfilContext = React.createContext();

const PerfilProvider = ({ children }) => {
  const { emailLogueado, datosUser, setDatosUser } = useGlobalContext();
  const { id } = useParams();
  const location = useLocation;
  const [currentPerfil, setCurrentPerfil] = useState({}); //Ruta de usuario actual, no el logueado
  const [currentPerfilMail, setCurrentPerfilMail] = useState("");
  const [siguiendo, setSiguiendo] = useState(0);
  const [seguidores, setSeguidores] = useState(0);
  const [pageItsLoad, setPageItsLoad] = useState(true);
  const [handleFollowButton, setHandleFollowButton] = useState(true);
  const [tweetsByUser, setTweetsByUser] = useState([]);
  const [tweetCount, setTweetCount] = useState(0);
  const [noti, setNoti] = useState(false);
  const [imagePerfil, setImagePerfil] = useState(null);

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

  const getTweetsPerfil = async (mailUser) => {
    const tweetsRef = collection(db, "tweets");
    const tweetsPerfil = query(tweetsRef, where("usuario", "==", mailUser));
    const querySnapshot = await getDocs(tweetsPerfil);
    const userTweets = [];
    querySnapshot.forEach((doc) => {
      userTweets.push({ ...doc.data(), id: doc.id });
      setTweetsByUser([...userTweets]);
    });
  };

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

          setNoti(true);
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

  useEffect(() => {
    const countTweets = () => {
      let newArray = [];
      if (tweetsByUser) {
        newArray = tweetsByUser.filter(
          (tweet) =>
            tweet.usuario === currentPerfilMail && tweet.parentId === null
        );
        setTweetCount(newArray.length);
      } else {
        newArray(0);
        setTweetCount(0);
      }
      console.log(newArray);
    };
    countTweets();
  }, [currentPerfilMail, tweetsByUser]);

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
        getTweetsPerfil,
        tweetsByUser,
        setTweetsByUser,
        tweetCount,
        // fetchImages,
        imagePerfil,
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
