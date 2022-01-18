import {
  ImgPerfil,
  TweetContainer,
  TweetNav,
  TweetContent,
  TweetImg,
  Username,
} from "./TweetIndividual.styles";
import { Link } from "react-router-dom";
import {
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import TweetForm from "../TweetForm";
import imgPerfil from "../../imgs/perfil.jpg";
import { useEffect, useState } from "react/cjs/react.development";

const TweetIndividual = ({ tweetId, correoUsuario }) => {
  const [tweet, setTweet] = useState([{}]);

  const getTweet = async () => {
    const tweetRef = doc(db, "tweets", tweetId);
    const tweetSnap = await getDoc(tweetRef);
    setTweet({ ...tweetSnap.data(), tweetId });
  };

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

  useEffect(() => {
    getTweet();
  }, []);

  return (
    <TweetContainer>
      <Link to={"/tweet/" + tweetId + "/" + correoUsuario}>GOTO</Link>

      <button onClick={() => eliminarTweet(tweetId)}>Eliminar Tweet</button>

      <ImgPerfil>
        <img src={imgPerfil} alt="" />
      </ImgPerfil>

      <TweetNav>
        <Username>Nombre</Username>
        <span>{correoUsuario}</span>
        <span>·</span>
      </TweetNav>

      <TweetContent>
        <div>{tweetId}</div>
        {tweet.descripcion && <p>{tweet.descripcion}</p>}
        {imgPerfil && <TweetImg src={imgPerfil} />}
      </TweetContent>
      <TweetForm parentId={tweetId} correoUsuario={correoUsuario} />
    </TweetContainer>
  );
};

export default TweetIndividual;
