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
      <Tweet correoUsuario={emailLogueado} arrayTweets={arrayTweets} />
    </HomeWrapper>
  );
};

export default Home;
