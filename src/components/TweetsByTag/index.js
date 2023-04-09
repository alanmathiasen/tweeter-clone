import React from "react";
import { useParams } from "react-router-dom";
import { useTweets } from "../../hooks/useTweets";
import TweetGroup from "../TweetGroup";

const TweetsByTag = () => {
    const { tag } = useParams();
    const tagQuery = {
        field: "tags",
        value: tag,
    };
    const { tweets, loading, queuedTweets, mergeTweets } = useTweets({ tagQuery });

    return <TweetGroup tweetArray={tweets} />;
};

export default TweetsByTag;
