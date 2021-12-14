import React from "react";
import { TweetFormWrapper, ButtonTwittear } from "./TweetForm.styles";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const TweetForm = ({ correoUsuario, arrayTweets, setArrayTweets }) => {
  async function agregarTweet(e) {
    e.preventDefault();
    const descripcion = e.target.detalles.value;

    // if (arrayTweets) {
    //   const nuevoArrayTweets = [
    //     ...arrayTweets,
    //     { timestamp: +new Date(), detalles: descripcion },
    //   ];
    //   setArrayTweets(nuevoArrayTweets);
    // } else {
    //   const nuevoArrayTweets = [
    //     { timestamp: +new Date(), detalles: descripcion },
    //   ];
    //   setArrayTweets(nuevoArrayTweets);
    // }

    const docRef = await addDoc(collection(db, "tweets"), {
      usuario: correoUsuario,
      descripcion: descripcion,
      timestamp: +new Date(),
    });
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
