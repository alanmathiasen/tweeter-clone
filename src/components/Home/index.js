import React, { useState, useEffect } from "react";
import { HomeWrapper } from "./Home.styles";
import TweetForm from "../TweetForm";
import Tweet from "../Tweet";
import {
  collection,
  doc,
  query,
  onSnapshot,
  updateDoc,
  deleteDoc,
  getDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

import { useGlobalContext } from "../../context/GlobalContext";

const Home = () => {
  const { emailLogueado } = useGlobalContext();

  const [arrayTweets, setArrayTweets] = useState([]);

  const [tweetsConQuery, setTweetsConQuery] = useState([]);

  const getTweets = () => {
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

    const tweetRef = doc(db, "tweets", idTweetAEliminar);
    const tweetSnap = await getDoc(tweetRef);
    if (tweetSnap.data().parentId) {
      const parentRef = doc(db, "tweets", tweetSnap.data().parentId);

      await updateDoc(parentRef, {
        children: arrayRemove(idTweetAEliminar),
      });
    }
    if (tweetSnap.data().children) {
      tweetSnap.data().children.forEach(async (child) => {
        await deleteDoc(doc(db, "tweets", child));
      });
    }

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
        correoUsuario={emailLogueado}
        arrayTweets={arrayTweets}
        setArrayTweets={setArrayTweets}
      />
      <Tweet
        correoUsuario={emailLogueado}
        arrayTweets={arrayTweets}
        eliminarTweet={eliminarTweet}
      />
    </HomeWrapper>
  );
};

export default Home;
