import React, { useEffect, useState } from "react";
import { Wrapper, Header, ImgPerfil, Username, TweetContent } from "./Quote.styles";
import { getUserByTweet } from "../../firebase/userCrud";
import { getTweet } from "../../firebase/tweetCrud";
import imgPerfil from "../../imgs/perfil.jpg";
import { shortDate } from "../../helpers/dateHelper";
import { useNavigate } from "react-router-dom";
import { parseMentions } from "../../helpers/tweetHelper";
const Quote = ({ tweetId = null }) => {
    const [tweet, setTweet] = useState({});
    const [author, setAuthor] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTweet() {
            setTweet(await getTweet(tweetId));
        }
        fetchTweet();
    }, [tweetId]);

    useEffect(() => {
        (async () => {
            const author = await getUserByTweet(tweet);
            setAuthor(author);
        })();
    }, [tweet]);

    const goTo = (e) => {
        e.stopPropagation();
        navigate("/tweet/" + tweetId);
    };

    return (
        <Wrapper onClick={goTo}>
            <Header>
                <ImgPerfil>
                    <img alt={`author.name`} src={author && (author.photoURL || imgPerfil)} />
                </ImgPerfil>

                <Username>{author && author.username}</Username>
                <span>{author && `@${author.route}`}</span>
                <span>·</span>
                {<span>{tweet.timestamp && shortDate(tweet.timestamp)}</span>}
            </Header>
            <TweetContent>{tweet.description && <p>{parseMentions(tweet.description)}</p>}</TweetContent>
        </Wrapper>
    );
};

export default Quote;
