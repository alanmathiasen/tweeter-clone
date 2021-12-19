import {
  ImgPerfil,
  TweetContainer,
  TweetNav,
  TweetContent,
  TweetImg,
  Username,
} from "./IndividualTweet.styled";
import imgPerfil from "../../imgs/perfil.jpg";
const IndividualTweet = ({ key, tweet, correoUsuario }) => {
  return (
    <TweetContainer>
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
    </TweetContainer>
  );
};

export default IndividualTweet;
