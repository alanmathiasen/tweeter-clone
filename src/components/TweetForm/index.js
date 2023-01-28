import React, { useState } from "react";
import { TweetFormWrapper, ButtonTwittear, ImagenPerfil, InputWrapper, TweetInput } from "./TweetForm.styles";
import ModalBase from "../ModalBase";
import {
    collection,
    doc,
    addDoc,
    updateDoc,
    arrayUnion,
    // arrayRemove,
    // query,
    // where,
    // deleteDoc,
    // getDocs,
    // getDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import FotoPerfil from "../../imgs/perfil.jpg";
import { ButtonColored } from "../Utils/ButtonColored";
import { useGlobalContext } from "../../context/GlobalContext";

const TweetForm = ({ parentId, quoteId = null, setShowModal = null, children }) => {
    const { emailLogueado, datosUser } = useGlobalContext();

    const [detalles, setDetalles] = useState("");

    const handleChange = (e) => {
        setDetalles(e.target.value);
    };

    async function agregarTweet(e) {
        try {
            e.preventDefault();
            if (typeof setShowModal === "function") {
                setShowModal(false);
            }
            const tweetsCollectionRef = collection(db, "tweets");
            const docRef = await addDoc(tweetsCollectionRef, {
                usuario: emailLogueado,
                descripcion: detalles,
                timestamp: +new Date(),
                parentId: parentId || null,
                quoteId: quoteId || null,
                children: [],
            });
            if (quoteId) {
                const tweetRef = doc(db, "tweets", quoteId);
                await updateDoc(tweetRef, {
                    quotes: arrayUnion(emailLogueado),
                });
            }
            if (parentId) await addChildren(parentId, docRef.id);
        } catch (err) {
            console.error(err);
        }

        //setDetalles("");
    }

    async function addChildren(parentId, childId) {
        const parentDocRef = doc(db, "tweets", parentId);

        await updateDoc(parentDocRef, {
            children: arrayUnion(childId),
        });
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
                    placeholder="Que esta pasando?"
                />
                {/*
       TODO
       no dejar twittear si no se esta loggeado 
       */}
                {children}
                <ButtonColored type="submit" onClick={(e) => agregarTweet(e)}>
                    Tweet
                </ButtonColored>
                {/* <ButtonTwittear type="submit">Tweet</ButtonTwittear> */}
            </InputWrapper>
        </TweetFormWrapper>
    );
};

export default TweetForm;
