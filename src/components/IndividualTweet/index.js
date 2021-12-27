import { useState, useEffect } from "react";

import {
  ImgPerfil,
  TweetContainer,
  TweetNav,
  TweetContent,
  TweetImg,
  Username,
} from "./IndividualTweet.styled";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import TweetForm from "../TweetForm";
import imgPerfil from "../../imgs/perfil.jpg";
import { createUserWithEmailAndPassword } from "firebase/auth";

const IndividualTweet = ({ id, tweet, correoUsuario, eliminarTweet }) => {
  const [children, setChildren] = useState([]);

  const getTweet = async (idTweet) => {
    const tweetRef = doc(db, "tweets", idTweet);
    const tweetSnap = await getDoc(tweetRef);
    if (tweetSnap.exists()) {
      const tweet = { ...tweetSnap.data() };
      console.log("Tweet:", tweet);
      return tweet;
    } else {
      return "Tweet doesn't exist.";
    }
  };

  const getChildren = async () => {
    const tweetRef = doc(db, "tweets", id);
    const tweetSnap = await getDoc(tweetRef);
    let childs = [];
    if (tweetSnap.exists()) {
      childs = await Promise.all(
        tweetSnap.data().children.map(async (idChild) => {
          const newChild = await getTweet(idChild);
          return newChild;
        })
      );
      console.log(childs);
    } else {
      console.log("no tweets??");
    }
    return childs;
  };

  useEffect(async () => {
    setChildren(await getChildren());
  }, []);

  useEffect(() => {
    console.log("HOLA", children);
  }, [children]);

  return (
    <TweetContainer>
      <button onClick={() => eliminarTweet(tweet.id)}>Eliminar Tweet</button>
      <ImgPerfil>
        <img src={imgPerfil} alt="" />
      </ImgPerfil>
      <TweetNav>
        <Username>Nombre</Username>
        <span>{correoUsuario}</span>
        <span>·</span>
      </TweetNav>

      <TweetContent>
        {tweet.descripcion && <p>{tweet.descripcion}</p>}
        {imgPerfil && <TweetImg src={imgPerfil} />}
      </TweetContent>
      <TweetForm parentId={id} correoUsuario={correoUsuario} />

      <div>
        {children && children.map((child) => <div>{child.descripcion}</div>)}
      </div>
    </TweetContainer>
  );
};

export default IndividualTweet;
