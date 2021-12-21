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

const IndividualTweet = ({ id, tweet, correoUsuario, eliminarTweet }) => {
  const [children, setChildren] = useState([]);

  const getChildren = async () => {
    const tweetRef = doc(db, "tweets", id);
    const tweetSnap = await getDoc(tweetRef);
    const arr = [];
    if (tweetSnap.exists()) {
      console.log(tweetSnap.children);
    }
  };

  useEffect(() => {
    getChildren();
  }, []);
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
      <div></div>
    </TweetContainer>
  );
};

export default IndividualTweet;
