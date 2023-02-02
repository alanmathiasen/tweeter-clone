import React from "react";
import { useTweets } from "../../hooks/useTweets";
import { HomeWrapper, TweetFormWrapper } from "./Home.styles";
import TweetForm from "../TweetForm";
import TweetHome from "../TweetHome";

const Home = () => {
    const { tweets, loading } = useTweets();

    return (
        <HomeWrapper>
            <h2>Inicio</h2>
            <TweetFormWrapper>
                <TweetForm />
            </TweetFormWrapper>
            {loading ? "loading" : <TweetHome arrayTweets={tweets} />}
        </HomeWrapper>
    );
};

export default Home;
