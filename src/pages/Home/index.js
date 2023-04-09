import React from "react";
import { useTweets } from "../../hooks/useTweets";
import { HomeWrapper, NewTweets, TweetFormWrapper } from "./Home.styles";
import TweetForm from "../../components/TweetForm";
import TweetGroup from "../../components/TweetGroup";
import { useGlobalContext } from "../../context/GlobalContext";
import { Navigate } from "react-router-dom";

const Home = () => {
    const { tweets, loading, queuedTweets, mergeTweets } = useTweets();
    const { userData, loggedUser } = useGlobalContext();
    if (!loggedUser) return <Navigate to="/explore" replace />;
    return (
        <HomeWrapper>
            <h2>Inicio</h2>
            {userData && (
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
