import {
  ImgPerfil,
  TweetContainer,
  TweetNav,
  TweetContent,
  TweetImg,
  Username,
} from "./TweetIndividual.styles";
import TweetForm from "../TweetForm";
import imgPerfil from "../../imgs/perfil.jpg";

const TweetIndividual = ({ tweet, correoUsuario, eliminarTweet }) => {
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
      <TweetForm parentId={tweet.id} correoUsuario={correoUsuario} />
    </TweetContainer>
  );
};

export default TweetIndividual;
