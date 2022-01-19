import { useState, useEffect } from "react";

import { Wrapper } from "./TweetGroup.styles";

import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

import TweetIndividual from "../TweetIndividual";

const TweetGroup = ({ tweetId, correoUsuario }) => {
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
    console.log(tweetId, "twwrsdtdsfds");
    const tweetRef = doc(db, "tweets", tweetId);
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

  //setChildrensId con onSnapshot
  useEffect(() => {
    const tweetRef = doc(db, "tweets", tweetId);
    const unsubscribe = onSnapshot(tweetRef, (snap) => {
      if (snap.data()) setChildrenIds(snap.data().children);
      else setChildrenIds([]);
    });
    return () => unsubscribe();
  }, [tweetId]);

  useEffect(async () => {
    console.log(childrenIds, "CHILDREN");
    setChildren(await getChildren());
  }, [childrenIds]);

  return (
    <Wrapper>
      {childrenIds &&
        childrenIds.map((cId) => {
          <TweetIndividual
            tweetId={cId}
            correoUsuario={correoUsuario}
            key={cId}
          />;
        })}
      {children &&
        children.map((child) => (
          <TweetIndividual
            tweetId={child.id}
            correoUsuario={correoUsuario}
            key={child.id}
          />
        ))}
    </Wrapper>
  );
};

export default TweetGroup;
