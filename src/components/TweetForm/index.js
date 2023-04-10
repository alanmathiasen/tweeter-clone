import React, { useState } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { TweetFormWrapper, ImagenPerfil, InputWrapper, TweetInput } from "./TweetForm.styles";
import FotoPerfil from "../../imgs/perfil.jpg";
import { ButtonColored } from "../common/ButtonColored";
import { useGlobalContext } from "../../context/GlobalContext";
import { createTweet, postTag } from "../../firebase/tweetCrud";
import { getUsersByQuery } from "../../firebase/userCrud";
import { extractMentionsFromRaw, extractTagsFromRaw } from "../../helpers/tweetHelper";

let container;

const TweetForm = ({ parentId, quoteId = null, setShowModal = null, children, placeholder = "Que esta pasando?" }) => {
    const { userData } = useGlobalContext();

    const [tweetInput, setTweetInput] = useState("");

    const handleInputChange = (e, newValue, newPlainTextValue, mentions) => {
        setTweetInput(e.target.value);
        console.log(mentions);
    };

    const handleGetData = async (search, updateSearchResults) => {
        const users = await getUsersByQuery("route", search);
        const result = users.map((user) => ({ display: user.route, id: user.route }));
        updateSearchResults(result);
    };

    const handleDatatag = async (search, updateSearchResults) => {
        const tags = [];
        if (tags.some((element) => search === element.id)) updateSearchResults(tags);
        updateSearchResults([{ id: search, display: search }]);
    };

    async function postTweet(e) {
        try {
            e.stopPropagation();
            e.preventDefault();
            const tags = extractTagsFromRaw(tweetInput);
            const mentions = extractMentionsFromRaw(tweetInput);
            if (typeof setShowModal === "function") {
                setShowModal(false);
            }
            const tweet = {
                user: userData.email,
                description: tweetInput,
                timestamp: +new Date(),
                parentId: parentId || null,
                quoteId: quoteId || null,
                children: [],
                tags,
                mentions,
            };
            await createTweet(tweet);
            if (tags) tags.forEach(async (tag) => await postTag(tag, userData.email));
        } catch (err) {
            console.error(err);
        } finally {
            setTweetInput("");
        }
    }
    //TODO FIX ADD HASHTAG ON SPACEBAR PRESS
    return (
        <TweetFormWrapper>
            <ImagenPerfil src={userData.photoURL ?? FotoPerfil}></ImagenPerfil>

            <InputWrapper>
                <MentionsInput
                    value={tweetInput}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    a11ySuggestionsListLabel={"Personas sugeridas para mencionar."}
                    className="mentions"
                    spellCheck="false"
                >
                    <Mention
                        trigger="#"
                        displayTransform={(tag) => `#${tag}`}
                        data={handleDatatag}
                        markup="$$$____id__~~~____display__$$$~~~"
                        className="mentions__mention"
                    />
                    <Mention
                        trigger="@"
                        displayTransform={(mention) => `@${mention}`}
                        data={handleGetData}
                        className="mentions__mention"
                        markup="@@@____id__^^^____display__@@@^^^"
                    />
                </MentionsInput>
                {/*
       TODO
       no dejar twittear si no se esta loggeado 
    */}
                {children}
                <ButtonColored disabled={tweetInput === ""} onClick={postTweet}>
                    Tweet
                </ButtonColored>
                {/* <ButtonTwittear type="submit">Tweet</ButtonTwittear> */}
            </InputWrapper>
        </TweetFormWrapper>
    );
};

export default TweetForm;
