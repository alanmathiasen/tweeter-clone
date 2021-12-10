import React, { useState } from "react";
import { TweetFormWrapper, ButtonTwittear } from "./TweetForm.styles";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const TweetForm = ({ correoUsuario, arrayTweets, setArrayTweets }) => {
  async function agregarTweet(e) {
    e.preventDefault();
    const detalles = e.target.detalles.value;

    if (arrayTweets) {
      const nuevoArrayTweets = [
        ...arrayTweets,
        { id: +new Date(), detalles: detalles },
      ];
      setArrayTweets(nuevoArrayTweets);
    } else {
      const nuevoArrayTweets = [{ id: +new Date(), detalles: detalles }];
      setArrayTweets(nuevoArrayTweets);
    }

    const docuRef = doc(db, `usuarios/${correoUsuario}`);
    const docuSnap = await getDoc(docuRef);
    if (docuSnap.exists()) {
      updateDoc(docuRef, {
        tweets: {
          id: +new Date(),
          detalles: detalles,
        },
      });
    } else {
      await setDoc(docuRef, {
        tweets: {
          id: +new Date(),
          detalles: detalles,
        },
      });
    }
    e.target.detalles.value = "";
  }

  return (
    <TweetFormWrapper onSubmit={agregarTweet}>
      <input type="text" placeholder="Qué está pasando?" id="detalles" />
      <ButtonTwittear type="submit">Tweet</ButtonTwittear>
    </TweetFormWrapper>
  );
};

export default TweetForm;
