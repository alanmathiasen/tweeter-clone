import React, { useEffect, useState } from "react";
import {
    Wrapper,
    Header,
    ImgPerfil,
    Username,
    TweetContent,
} from "./Quote.styles";
import { getAuthor, getTweet } from "../../firebase/getters";
import imgPerfil from "../../imgs/perfil.jpg";
import { shortDate } from "../../helpers/dateHelper";
const Quote = ({ tweetId = null }) => {
    const [tweet, setTweet] = useState({});
    const [author, setAuthor] = useState({});

    useEffect(() => {
        async function fetchTweet() {
            setTweet(await getTweet(tweetId));
        }
        fetchTweet();
    }, [tweetId]);

    useEffect(() => {
        async function fetchAuthor() {
            setAuthor(await getAuthor(tweet));
        }
        fetchAuthor();
    }, [tweet]);
    return (
        <Wrapper>
            <Header>
                <ImgPerfil>
                    <img alt="" src={imgPerfil} />
                </ImgPerfil>

                <Username>Nombre</Username>
                <span>{author && `@${author.ruta}`}</span>
                <span>·</span>
                {<span>{tweet.timestamp && shortDate(tweet.timestamp)}</span>}
            </Header>
            <TweetContent>
                {tweet.descripcion && <p>{tweet.descripcion}</p>}
            </TweetContent>
        </Wrapper>
    );
};

export default Quote;
