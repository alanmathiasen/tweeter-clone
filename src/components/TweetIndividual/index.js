import {
  ImgPerfil,
  TweetContainer,
  TweetNav,
  TweetContent,
  Username,
  BorrarTweet,
} from "./TweetIndividual.styles";

import { useEffect, useState } from "react/cjs/react.development";
import { Link } from "react-router-dom";
import { GiCancel } from "react-icons/gi";
import { BiComment, BiHeart } from "react-icons/bi";

import {
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  arrayRemove,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

import ButtonGroup from "./ButtonGroup";
import TweetForm from "../TweetForm";
import imgPerfil from "../../imgs/perfil.jpg";

const TweetIndividual = ({ tweetId, correoUsuario }) => {
  const [tweet, setTweet] = useState({});
  const [liked, setLiked] = useState(false);
  /*const getTweet = async () => {
    const tweetRef = doc(db, "tweets", tweetId);
    const tweetSnap = await getDoc(tweetRef);
    setTweet({ ...tweetSnap.data(), tweetId });
  };*/

  async function eliminarTweet(idTweetAEliminar) {
    //actualizar state con nuevo array
    /*const nuevoArrayTweets = arrayTweets.filter(
      (tweet) => tweet.id !== idTweetAEliminar
    );*/
    const tweetRef = doc(db, "tweets", idTweetAEliminar);
    const tweetSnap = await getDoc(tweetRef);
    if (tweetSnap.data().parentId) {
      const parentRef = doc(db, "tweets", tweetSnap.data().parentId);

      await updateDoc(parentRef, {
        children: arrayRemove(idTweetAEliminar),
      });
    }
    if (tweetSnap.data().children) {
      tweetSnap.data().children.forEach(async (child) => {
        await deleteDoc(doc(db, "tweets", child));
      });
    }
    //actualizar base de datos
    await deleteDoc(doc(db, "tweets", idTweetAEliminar));
    /*setArrayTweets(nuevoArrayTweets);*/
  }

  async function likeTweet() {
    const tweetRef = doc(db, "tweets", tweetId);
    const tweetSnap = await getDoc(tweetRef);
    if (
      tweetSnap.data().likes &&
      tweetSnap.data().likes.includes(correoUsuario)
    ) {
      await updateDoc(tweetRef, {
        likes: arrayRemove(correoUsuario),
      });
    } else {
      await updateDoc(tweetRef, {
        likes: arrayUnion(correoUsuario),
      });
    }
  }

  useEffect(() => {
    //getTweet();
    const tweetRef = doc(db, "tweets", tweetId);
    const unsubscribe = onSnapshot(tweetRef, (snap) => {
      if (snap.data()) setTweet(snap.data());
      else setTweet({});
      if (snap.data().likes && snap.data().likes.includes(correoUsuario)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    });
    return () => unsubscribe();
  }, [tweetId]);

  return (
    <TweetContainer>
      {/* <Link to={"/tweet/" + tweetId + "/" + correoUsuario}>GOTO</Link> */}
      <BorrarTweet onClick={() => eliminarTweet(tweetId)}>
        <GiCancel />
      </BorrarTweet>
      <ImgPerfil>
        <img src={imgPerfil} alt="" />
      </ImgPerfil>
      <TweetNav>
        <Username>Nombre</Username>
        <span>@alan_wtf</span>
        <span>·</span>
        <span>6h</span>
      </TweetNav>
      <TweetContent>
        {tweet.descripcion && <p>{tweet.descripcion}</p>}
      </TweetContent>
      <ButtonGroup
        replies={tweet.children ? tweet.children.length : null}
        likes={tweet.likes ? tweet.likes.length : null}
        likeTweet={likeTweet}
        liked={liked}
      />
      <TweetForm parentId={tweetId} correoUsuario={correoUsuario} />
    </TweetContainer>
  );
};

export default TweetIndividual;
