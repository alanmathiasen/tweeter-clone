import {
  ImgPerfil,
  TweetContainer,
  TweetNav,
  TweetContent,
  TweetImg,
  Username,
} from "./TweetIndividual.styles";
import { Link, useParams } from "react-router-dom";
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

const TweetIndividual = ({ tweet, correoUsuario }) => {
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
  return (
    <TweetContainer>
      <Link
        to={"/tweet/" + tweet.id + "/" + correoUsuario}
        onClick={(e) => {
          if (e.target !== e.currentTarget) {
            if (["A", "BUTTON"].includes(e.target.nodeName)) {
              e.preventDefault();
            }
          }
        }}
        state={{
          tweet: tweet,
          correoUsuario: correoUsuario,
          eliminarTweet: eliminarTweet,
        }}
      >
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
        <TweetForm parentId={tweet.id} correoUsuario={correoUsuario} />
      </Link>
    </TweetContainer>
  );
};

export default TweetIndividual;
