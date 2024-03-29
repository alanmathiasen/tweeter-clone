import React from "react";
import { ImgPerfil, TweetNav, TweetContent, Username, Wrapper } from "./BaseTweet.styles";
import imgPerfil from "../../imgs/perfil.jpg";
import { parseMentions } from "../../helpers/tweetHelper";
const BaseTweet = ({ tweet, author, children }) => {
    return (
        <Wrapper>
            <ImgPerfil>
                <img src={imgPerfil} alt="" />
            </ImgPerfil>
            <TweetNav>
                <Username>Nombre</Username>
                <span>{author && `@${author.route}`}</span>
                <span>·</span>
                <span>6h</span>
            </TweetNav>
            <TweetContent>{tweet.description && <p>{parseMentions(tweet.description)}</p>}</TweetContent>
            {children}
        </Wrapper>
    );
};

export default BaseTweet;
