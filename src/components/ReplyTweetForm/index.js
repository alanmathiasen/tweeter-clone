import React from "react";

import TweetForm from "../TweetForm";
import imgPerfil from "../../imgs/perfil.jpg";
import {
  ImgPerfil,
  TweetNav,
  TweetContent,
  Username,
} from "./TweetIndividual.styles";
const ReplyTweetForm = ({ parentTweet, author }) => {
  <Wrapper>
    <ImgPerfil>
      <img src={imgPerfil} alt="" />
    </ImgPerfil>
    <TweetNav>
      <Username>Nombre</Username>
      <span>{author && `@${author.ruta}`}</span>
      <span>·</span>
      <span>6h</span>
    </TweetNav>
    <TweetContent>
      <p>{tweet.descripcion}</p>
    </TweetContent>
    <TweetForm />
  </Wrapper>;
};

export default ReplyTweetForm;
