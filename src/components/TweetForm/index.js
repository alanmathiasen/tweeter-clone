import React from "react";
import { TweetFormWrapper, ButtonTwittear } from "./TweetForm.styles";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const TweetForm = ({
  correoUsuario,
  arrayTweets,
  setArrayTweets,
  parentId,
}) => {
  const tweetsCollectionRef = collection(db, "tweets");

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

    const docRef = await addDoc(tweetsCollectionRef, {
      usuario: correoUsuario,
      descripcion: descripcion,
      timestamp: +new Date(),
      parentId: parentId ? parentId : null,
      children: [],
    });
    if (parentId) await addChildren(parentId, docRef.id);
    e.target.detalles.value = "";
  }

  async function addChildren(parentId, childId) {
    const parentDocRef = doc(db, "tweets", parentId);
    console.log(childId);
    await updateDoc(parentDocRef, {
      children: arrayUnion(childId),
    });
  }

  return (
    <TweetFormWrapper onSubmit={agregarTweet}>
      <input type="text" placeholder="Qué está pasando?" id="detalles" />
      {/*
       TODO
       no dejar twittear si no se esta loggeado 
       */}
      <ButtonTwittear type="submit">Tweet</ButtonTwittear>
    </TweetFormWrapper>
  );
};

export default TweetForm;
