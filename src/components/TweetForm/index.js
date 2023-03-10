import React, { useState } from "react";
import { TweetFormWrapper, ImagenPerfil, InputWrapper, TweetInput } from "./TweetForm.styles";
import FotoPerfil from "../../imgs/perfil.jpg";
import { ButtonColored } from "../common/ButtonColored";
import { useGlobalContext } from "../../context/GlobalContext";
import { createTweet } from "../../firebase/tweetCrud";

const TweetForm = ({ parentId, quoteId = null, setShowModal = null, children, placeholder = "Que esta pasando?" }) => {
    const { emailLogueado, datosUser } = useGlobalContext();

    const [detalles, setDetalles] = useState("");

    const handleChange = (e) => {
        setDetalles(e.target.value);
    };

    async function postTweet(e) {
        try {
            e.stopPropagation();
            e.preventDefault();
            console.log("hola");
            if (typeof setShowModal === "function") {
                setShowModal(false);
            }
            const tweet = {
                usuario: emailLogueado,
                descripcion: detalles,
                timestamp: +new Date(),
                parentId: parentId || null,
                quoteId: quoteId || null,
                children: [],
            };
            await createTweet(tweet);
        } catch (err) {
            console.error(err);
        } finally {
            setDetalles("");
        }
    }

    return (
        <TweetFormWrapper>
            <ImagenPerfil src={datosUser.photoURL ? datosUser.photoURL : FotoPerfil}></ImagenPerfil>
            <InputWrapper>
                <TweetInput
                    type="text"
                    id="detalles"
                    onChange={handleChange}
                    value={detalles}
                    placeholder={placeholder}
                />
                {/*
       TODO
       no dejar twittear si no se esta loggeado 
       */}
                {children}
                <ButtonColored type="submit" disabled={detalles === ""} onClick={postTweet}>
                    Tweet
                </ButtonColored>
                {/* <ButtonTwittear type="submit">Tweet</ButtonTwittear> */}
            </InputWrapper>
        </TweetFormWrapper>
    );
};

export default TweetForm;
