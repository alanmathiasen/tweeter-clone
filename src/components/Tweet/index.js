import React, { useState } from "react";
import {
  TweetWrapper,
  ImgPerfil,
  TweetContainer,
  TweetNav,
  TweetContent,
  TweetImagen,
} from "./Tweet.styled";

import imgPerfil from "../../imgs/perfil.jpg";

const Tweet = () => {
  const [descripcion, setDescripcion] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at euismod arcu. Sed ultrices ipsum nulla, sed fermentum ante laoreet eu."
  );
  const [imagenTweet, setImagenTweet] = useState(imgPerfil);

  return (
    <TweetWrapper>
      <ImgPerfil src={imgPerfil} />
      <TweetContainer>
        <TweetNav>
          <h4>Rick Sanchez</h4>
          <span>@RickSanchez</span>
          <span>·</span>
          <a href="/0223comar/status/1466783975939223559">20m</a>
        </TweetNav>
        <TweetContent>
          {descripcion && <p>{descripcion}</p>}
          {imagenTweet && <TweetImagen src={imagenTweet} />}
        </TweetContent>
      </TweetContainer>
    </TweetWrapper>
  );
};

export default Tweet;
