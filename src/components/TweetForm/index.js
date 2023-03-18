import React, { useState } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { TweetFormWrapper, ImagenPerfil, InputWrapper, TweetInput } from "./TweetForm.styles";
import FotoPerfil from "../../imgs/perfil.jpg";
import { ButtonColored } from "../common/ButtonColored";
import { useGlobalContext } from "../../context/GlobalContext";
import { createTweet } from "../../firebase/tweetCrud";
import { getUsersByQuery } from "../../firebase/userCrud";

let container;

const TweetForm = ({ parentId, quoteId = null, setShowModal = null, children, placeholder = "Que esta pasando?" }) => {
    const { emailLogueado, datosUser } = useGlobalContext();

    const [tweetInput, setTweetInput] = useState("");

    const handleInputChange = (e, newValue, newPlainTextValue, mentions) => {
        console.log({ newValue, newPlainTextValue, mentions });
        setTweetInput(e.target.value);
    };

    const handleGetData = async (search, updateSearchResults) => {
        console.log(search);
        const users = await getUsersByQuery(search);
        const result = users.map((user) => ({ display: user.ruta, id: user.ruta }));
        updateSearchResults(result);
    };

    async function postTweet(e) {
        try {
            e.stopPropagation();
            e.preventDefault();
            if (typeof setShowModal === "function") {
                setShowModal(false);
            }
            const tweet = {
                usuario: emailLogueado,
                descripcion: tweetInput,
                timestamp: +new Date(),
                parentId: parentId || null,
                quoteId: quoteId || null,
                children: [],
            };
            await createTweet(tweet);
        } catch (err) {
            console.error(err);
        } finally {
            setTweetInput("");
        }
    }
    // async function savePost(e) {
    //     e.preventDefault();

    //     let newContent = content;

    //     newContent = newContent.split("@@@__").join('<a href="/user/');
    //     newContent = newContent.split("^^^__").join(`">@`);
    //     newContent = newContent.split("@@@^^^").join("</a>");

    //     newContent = newContent.split("$$$__").join('<a href="/tag/');
    //     newContent = newContent.split("~~~__").join(`">#`);
    //     newContent = newContent.split("$$$~~~").join("</a>");
    //     if (newContent !== "") {
    //       let body = newContent.trim();
    //       //Call to your DataBase like backendModule.savePost(body,  along_with_other_params);
    //       tagNames.map(async (tag) => {
    //         try {
    //           await APIservice.post("/tag", {
    //             name: tag,
    //           });
    //         } catch (error) {
    //           console.log(error);
    //         }
    //       });
    //       console.log(body);
    //       try {
    //         await APIservice.post("/post", {
    //           title,
    //           content: body,
    //           createdAt: new Date().getTime(),
    //         });
    //         history.push("/");
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     }
    return (
        <TweetFormWrapper>
            <ImagenPerfil src={datosUser.photoURL ? datosUser.photoURL : FotoPerfil}></ImagenPerfil>

            <InputWrapper>
                <MentionsInput
                    value={tweetInput}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    a11ySuggestionsListLabel={"Personas sugeridas para mencionar."}
                    className="mentions"
                    spellcheck="false"
                    suggestionsPortalHost={container}
                >
                    <Mention
                        trigger="#"
                        displayTransform={(tag) => `#${tag}`}
                        data={[{ display: "example", id: "example" }]}
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
