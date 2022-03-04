import React, { useEffect, useState } from "react";
import {} from "./TweetsPerfil.styles";
import { useParams, useLocation } from "react-router-dom";
import { usePerfilContext } from "../../../context/PerfilContext";
import TweetIndividual from "../../TweetIndividual";

const TweetsPerfil = () => {
  const {
    getTweetsPerfil,
    tweetsByUser,
    currentPerfilMail,
    setTweetsByUser,
    pageItsLoad,
    handleLoad,
    handleFollowButton,
  } = usePerfilContext();
  const { id } = useParams();
  const location = useLocation();
  const [renderTweets, setRenderTweets] = useState(false);

  useEffect(() => {
    let mailUser = currentPerfilMail;
    getTweetsPerfil(mailUser);
  }, [currentPerfilMail]);

  if (!pageItsLoad) {
    return <div>cargando</div>;
  }

  return (
    <div>
      {tweetsByUser &&
        tweetsByUser.map((tweet) => {
          if (!tweet.parentId && tweet.usuario === currentPerfilMail) {
            console.log("rendering");
            return <TweetIndividual key={tweet.id} tweetId={tweet.id} />;
          }
        })}
    </div>
  );
};

export default TweetsPerfil;
