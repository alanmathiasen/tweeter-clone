import React, { useState, useEffect } from "react";
import { HomeWrapper } from "./Home.styles";

import TweetForm from "../TweetForm";
import Tweet from "../Tweet";

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const Home = ({ correoUsuario }) => {
  const [arrayTweets, setArrayTweets] = useState([]);

  async function buscarOrCrearDocumento(idDocumento) {
    //crear referencia al documento
    const docuRef = doc(db, `usuarios/${idDocumento}`);
    //buscar documento
    const docuSnap = await getDoc(docuRef);
    //consulta devuelve un objeto, no un buleano, por eso hay que usar .exists()
    //revisar si existe
    if (docuSnap.exists()) {
      //si existe
      const infoDocu = docuSnap.data();
      console.log(infoDocu);
      return infoDocu.tweets;
    } else {
      //no existe
      console.log("Sin tweets");
      // await setDoc(
      //   docuRef,
      //   { tweets: [...fakeTweet] },
      //   { perfil: [...fakePerfil] }
      // );
      // const docuSnap = await getDoc(docuRef);
      // const infoDocu = docuSnap.data();
      // return infoDocu.tweets;
    }
  }

  async function eliminarTweet(idTweetAEliminar) {
    //nuevo array de tweets
    console.log(idTweetAEliminar);
    const nuevoArrayTweets = arrayTweets.filter(
      (tweet) => tweet.id !== idTweetAEliminar
    );
    //actualizar base de datos
    const docuRef = doc(db, `usuarios/${correoUsuario}`);
    updateDoc(docuRef, { tweets: [...nuevoArrayTweets] });
    //actualizar state
    setArrayTweets(nuevoArrayTweets);
  }

  useEffect(() => {
    async function fetchTweets() {
      const respuestaTweets = await buscarOrCrearDocumento(correoUsuario);
      setArrayTweets(respuestaTweets);
    }

    fetchTweets();
  }, []);

  return (
    <HomeWrapper>
      <h2>Home</h2>
      <TweetForm
        correoUsuario={correoUsuario}
        arrayTweets={arrayTweets}
        setArrayTweets={setArrayTweets}
      />
      <Tweet
        correoUsuario={correoUsuario}
        arrayTweets={arrayTweets}
        eliminarTweet={eliminarTweet}
      />
    </HomeWrapper>
  );
};

export default Home;
