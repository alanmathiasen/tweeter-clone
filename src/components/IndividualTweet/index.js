import {
  ImgPerfil,
  TweetContainer,
  TweetNav,
  TweetContent,
  TweetImg,
  Username,
} from "./IndividualTweet.styled";
import TweetForm from "../TweetForm";
import imgPerfil from "../../imgs/perfil.jpg";
const IndividualTweet = ({ key, tweet, correoUsuario, eliminarTweet }) => {
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
      <TweetForm parentId={key} correoUsuario={correoUsuario} />
    </TweetContainer>
  );
};

export default IndividualTweet;
