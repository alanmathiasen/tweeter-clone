import React from "react";
import { useTweets } from "../../hooks/useTweets";
import { HomeWrapper, NewTweets, TweetFormWrapper } from "./Home.styles";
import TweetForm from "../TweetForm";
import TweetGroup from "../TweetGroup";
import { useGlobalContext } from "../../context/GlobalContext";

const Home = () => {
    const { tweets, loading, queuedTweets, mergeTweets } = useTweets();
    const { usuarioLogueado } = useGlobalContext();
    return (
        <HomeWrapper>
            <h2>Inicio</h2>
            {usuarioLogueado && (
                <TweetFormWrapper>
                    <TweetForm />
                </TweetFormWrapper>
            )}
            {/* {loading ? "loading" : <TweetHome arrayTweets={tweets} />} */}

            {queuedTweets.length > 0 && (
                <NewTweets onClick={mergeTweets}>Mostrar {queuedTweets.length} tweets nuevos.</NewTweets>
            )}
            <TweetGroup tweetArray={tweets} />
        </HomeWrapper>
    );
};

export default Home;
