import React, { useEffect, useState } from "react";
import { Wrapper, Header, ImgPerfil, Username, TweetContent } from "./Quote.styles";
import { getUserByTweet } from "../../firebase/userCrud";
import { getTweet } from "../../firebase/tweetCrud";
import imgPerfil from "../../imgs/perfil.jpg";
import { shortDate } from "../../helpers/dateHelper";
import { useNavigate } from "react-router-dom";
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
                    <img alt="" src={author && (author.photoURL || imgPerfil)} />
                </ImgPerfil>

                <Username>{author && author.nombre}</Username>
                <span>{author && `@${author.ruta}`}</span>
                <span>·</span>
                {<span>{tweet.timestamp && shortDate(tweet.timestamp)}</span>}
            </Header>
            <TweetContent>{tweet.descripcion && <p>{tweet.descripcion}</p>}</TweetContent>
        </Wrapper>
    );
};

export default Quote;
