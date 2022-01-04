import { useState, useEffect } from "react";

import { Wrapper } from "./TweetGroup.styles";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import TweetForm from "../TweetForm";
import TweetIndividual from "../TweetIndividual";
import imgPerfil from "../../imgs/perfil.jpg";
import { createUserWithEmailAndPassword } from "firebase/auth";

const TweetGroup = ({ tweet, correoUsuario, eliminarTweet }) => {
  const [childrenIds, setChildrenIds] = useState([]);
  const [children, setChildren] = useState([]);

  const getTweet = async (idTweet) => {
    const tweetRef = doc(db, "tweets", idTweet);
    const tweetSnap = await getDoc(tweetRef);
    if (tweetSnap.exists()) {
      const twit = { ...tweetSnap.data() };
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
          if (newChild != "ERROR") newChild.id = idChild;
          return newChild;
        })
      );
      console.log("childs", childs);
    } else {
      console.log("no tweets??");
    }

    const lastChilds = childs.filter((child) => {
      console.log(childs);
      if (child === "ERROR") {
        return false;
      }
      return true;
    });

    return lastChilds;
  };

  useEffect(() => {
    const tweetRef = doc(db, "tweets", tweet.id);
    const unsubscribe = onSnapshot(tweetRef, (snap) => {
      if (snap.data()) setChildrenIds(snap.data().children);
      else setChildrenIds([]);
    });
    return () => unsubscribe();
  }, []);

  useEffect(async () => {
    setChildren(await getChildren());
  }, [childrenIds]);

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
