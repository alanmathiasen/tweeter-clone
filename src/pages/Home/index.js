import React from "react";
import { useTweets } from "../../hooks/useTweets";
import { HomeWrapper, NewTweets, TweetFormWrapper, Header } from "./Home.styles";
import TweetForm from "../../components/TweetForm";
import TweetGroup from "../../components/TweetGroup";
import { useGlobalContext } from "../../context/GlobalContext";
import { useNavigate, Navigate } from "react-router-dom";
import TabList from "../../components/common/TabList";
import { HOME_PAGE_TABS } from "../../constants";

const Home = () => {
    const { tweets, loading, queuedTweets, mergeTweets } = useTweets();
    const { userData, loggedUser } = useGlobalContext();
    const navigate = useNavigate();

    if (!loggedUser) return <Navigate to="/explore" replace />;
    return (
        <HomeWrapper>
            <Header>
                <h2>Inicio</h2>
                <TabList tabs={HOME_PAGE_TABS} handleClick={() => {}} />
            </Header>

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
