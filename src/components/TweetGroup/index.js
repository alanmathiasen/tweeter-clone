import { useState, useEffect } from "react";

import {
  Wrapper,
  ImgPerfil,
  TweetContainer,
  TweetNav,
  TweetContent,
  TweetImg,
  Username,
} from "./TweetGroup.styles";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import TweetForm from "../TweetForm";
import TweetIndividual from "../TweetIndividual";
import imgPerfil from "../../imgs/perfil.jpg";
import { createUserWithEmailAndPassword } from "firebase/auth";

const TweetGroup = ({ tweet, correoUsuario, eliminarTweet }) => {
  const [children, setChildren] = useState([]);

  const getTweet = async (idTweet) => {
    const tweetRef = doc(db, "tweets", idTweet);
    const tweetSnap = await getDoc(tweetRef);
    if (tweetSnap.exists()) {
      const twit = { ...tweetSnap.data() };
      console.log("Tweet:", twit);
      return twit;
    } else {
      return "ERROR";
    }
  };

  const getChildren = async () => {
    const tweetRef = doc(db, "tweets", tweet.id);
    const tweetSnap = await getDoc(tweetRef);
    let childs = [];
    if (tweetSnap.exists() && tweetSnap.data().children) {
      childs = await Promise.all(
        tweetSnap.data().children.map(async (idChild) => {
          const newChild = await getTweet(idChild);
          console.log(newChild);
          if (newChild != "ERROR") newChild.id = idChild;
          return newChild;
        })
      );
      console.log("childs", childs);
    } else {
      console.log("no tweets??");
    }
    const lastChilds = childs.filter((child) => {
      console.log(child);
      if (child === "ERROR") {
        return false;
      }
      return true;
    });

    console.log("last childs", lastChilds);
    return lastChilds;
  };

  useEffect(async () => {
    setChildren(await getChildren());
  }, []);

  return (
    <Wrapper>
      <TweetIndividual
        tweet={tweet}
        eliminarTweet={eliminarTweet}
        correoUsuario={correoUsuario}
        key={tweet.id}
      />
      {children &&
        children.map((child) => (
          <TweetIndividual
            tweet={child}
            eliminarTweet={eliminarTweet}
            correoUsuario={correoUsuario}
            key={child.id}
          />
        ))}
    </Wrapper>
  );
};

export default TweetGroup;
