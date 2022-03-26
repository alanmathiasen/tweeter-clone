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
const Quote = ({ tweetId }) => {
    const [tweet, setTweet] = useState({});
    const [author, setAuthor] = useState({});
    console.log(tweetId);
    useEffect(() => {
        (async () => {
            setTweet(await getTweet(tweetId));
        })();
    }, [tweetId]);

    useEffect(() => {
        (async () => {
            setAuthor(await getAuthor(tweet));
        })();
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
