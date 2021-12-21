import React, { useState, useEffect } from "react";
import { HomeWrapper } from "./Home.styles";
import TweetForm from "../TweetForm";
import Tweet from "../Tweet";
import {
  collection,
  doc,
  query,
  onSnapshot,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const Home = ({ correoUsuario }) => {
  const [arrayTweets, setArrayTweets] = useState([]);

  const [tweetsConQuery, setTweetsConQuery] = useState([]);

  const getTweets = async () => {
    const docQuery = query(collection(db, "tweets"));

    const misDatos = onSnapshot(docQuery, (querySnapshot) => {
      const misTweets = [];
      querySnapshot.forEach((doc) => {
        misTweets.push({ ...doc.data(), id: doc.id });
      });
      setArrayTweets(misTweets);
    });
  };

  async function eliminarTweet(idTweetAEliminar) {
    //actualizar state con nuevo array
    const nuevoArrayTweets = arrayTweets.filter(
      (tweet) => tweet.id !== idTweetAEliminar
    );
    //actualizar base de datos
    await deleteDoc(doc(db, "tweets", idTweetAEliminar));
    setArrayTweets(nuevoArrayTweets);
  }

  useEffect(() => {
    getTweets();
  }, []);

  useEffect(() => {
    //console.log(arrayTweets);
  }, [arrayTweets]);

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
