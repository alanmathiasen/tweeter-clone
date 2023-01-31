import React from "react";
import { useLoadTweets } from "../../hooks/useLoadTweets";
import { HomeWrapper, TweetFormWrapper } from "./Home.styles";
import TweetForm from "../TweetForm";
import TweetHome from "../TweetHome";

const Home = () => {
    const { tweets, loading } = useLoadTweets();
    return (
        <HomeWrapper>
            <h2>Inicio</h2>
            <TweetFormWrapper>
                <TweetForm />
            </TweetFormWrapper>
            {!tweets || tweets.length === 0 ? "loading" : <TweetHome arrayTweets={tweets} />}
        </HomeWrapper>
    );
};

export default Home;
