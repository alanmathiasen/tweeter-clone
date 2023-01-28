import React from "react";
import { TweetWrapper } from "./TweetList.styled";

import TweetGroup from "../TweetGroup";

const TweetHome = ({ arrayTweets }) => {
    return <TweetWrapper>{arrayTweets && <TweetGroup tweetArray={arrayTweets} />}</TweetWrapper>;
};

export default TweetHome;
