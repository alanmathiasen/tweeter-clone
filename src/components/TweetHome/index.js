import React, { useState } from "react";
import { TweetWrapper } from "./TweetList.styled";

import imgPerfil from "../../imgs/perfil.jpg";
import TweetGroup from "../TweetGroup";

const TweetHome = ({ arrayTweets }) => {
    return <TweetWrapper>{arrayTweets && <TweetGroup tweetArray={arrayTweets} />}</TweetWrapper>;
};

export default TweetHome;
