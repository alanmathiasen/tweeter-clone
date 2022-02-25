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
import TweetIndividual from "../TweetIndividual";
import TweetGroup from "../TweetGroup";

const Tweet = ({ correoUsuario, arrayTweets, eliminarTweet }) => {
  const [imagenTweet, setImagenTweet] = useState(imgPerfil);

  return (
    <TweetWrapper>
      {arrayTweets && <TweetGroup tweetArray={arrayTweets} />}
    </TweetWrapper>
  );
};

export default Tweet;
