import { Wrapper } from "./TweetPage.styles";
import TweetGroup from "../../components/TweetGroup";
import TweetIndividual from "../../components/TweetIndividual";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

import { useState, useEffect } from "react/cjs/react.development";

const TweetPage = () => {
  let { id } = useParams();
  const [idState, setIdState] = useState(id);
  const [children, setChildren] = useState([]);
  const [childrenIds, setChildrenIds] = useState([]);
  const [parents, setParents] = useState([]);
  const tweetRef = doc(db, "tweets", id);
  const getTweet = async (idTweet) => {
    //const tweetRef = doc(db, "tweets", idTweet);
    const tweetSnap = await getDoc(tweetRef);
    if (tweetSnap.exists()) {
      const twit = { ...tweetSnap.data() };
      return twit;
    } else {
      return "ERROR";
    }
  };

  const getChildren = async () => {
    console.log(idState, "twwrsdtdsfds");
    //const tweetRef = doc(db, "tweets", idState);
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
    //const tweetRef = doc(db, "tweets", idState);

    const unsubscribe = onSnapshot(tweetRef, (snap) => {
      if (snap.data()) setChildrenIds(snap.data().children);
      else setChildrenIds([]);
    });
    return () => unsubscribe();
  }, [idState]);

  const getParents = async () => {
    const pIds = [];
    const tweetSnap = await getDoc(tweetRef);
    if (tweetSnap.data().parentId) {
      console.log();
      await hasParent(idState, pIds);
    }

    let parents = [];
    if (pIds) {
      parents = await Promise.all(
        pIds.map(async (idP) => {
          console.log(pIds, "dentro del promise");
          const newChild = await getTweet(idP);
          if (newChild != "ERROR") newChild.id = idP;
          return newChild;
        })
      );
    }

    return parents.reverse();
  };

  const hasParent = async (id, pIds) => {
    const tweetRef = doc(db, "tweets", id);
    const tweetSnap = await getDoc(tweetRef);
    console.log(tweetSnap.data().parentId);
    if (tweetSnap.data().parentId) {
      pIds.push(tweetSnap.data().parentId);
      await hasParent(tweetSnap.data().parentId, pIds);
    } else {
      return 0;
    }
  };

  useEffect(async () => {
    setChildren(await getChildren());
    setParents(await getParents());
  }, [childrenIds]);

  //const location = useLocation();
  useEffect(() => {
    setIdState(id);
  }, [id]);

  return (
    <Wrapper>
      {console.log(parents)}
      {parents && <TweetGroup tweetArray={parents} />}
      {idState && <TweetIndividual tweetId={idState} mainTweet key={idState} />}
      {idState && <TweetGroup tweetArray={children} />}
    </Wrapper>
  );
};

export default TweetPage;
