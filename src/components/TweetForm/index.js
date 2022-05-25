import React, { useState, useEffect } from "react";
import {
  TweetFormWrapper,
  ButtonTwittear,
  ImagenPerfil,
  InputWrapper,
  TweetInput,
  InputFile,
  LabelFile,
  ImagenFile,
} from "./TweetForm.styles";
import ModalBase from "../ModalBase";
import {
    collection,
    doc,
    addDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    query,
    where,
    deleteDoc,
    getDocs,
    getDoc,
} from "firebase/firestore";
import { IoImageOutline } from "react-icons/io5";
import { db, storage } from "../../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import FotoPerfil from "../../imgs/perfil.jpg";
import { ButtonColored } from "../Utils/ButtonColored";
import { useGlobalContext } from "../../context/GlobalContext";

const TweetForm = ({
    parentId,
    quoteId = null,
    setShowModal = null,
    children,
}) => {
    const { emailLogueado, datosUser } = useGlobalContext();
    const tweetsCollectionRef = collection(db, "tweets");

  const [detalles, setDetalles] = useState("");
  const [imgFile, setImgFile] = useState(null);

  const handleChange = (e) => {
    setDetalles(e.target.value);
  };

  async function agregarTweet(e) {
    e.preventDefault();

        if (typeof setShowModal === "function") {
            setShowModal(false);
        }
        if (quoteId) {
            const tweetRef = doc(db, "tweets", quoteId);
            const docRef = await addDoc(tweetsCollectionRef, {
                usuario: emailLogueado,
                descripcion: detalles,
                timestamp: +new Date(),
                parentId: parentId ? parentId : null,
                quoteId: quoteId ? quoteId : null,
                children: [],
            });
            if (parentId) await addChildren(parentId, docRef.id);
            //e.target.value = "";
            await updateDoc(tweetRef, {
                quotes: arrayUnion(emailLogueado),
            });
        }

        //setDetalles("");
    }
    setDetalles("");
  }

  async function addChildren(parentId, childId) {
    const parentDocRef = doc(db, "tweets", parentId);
    console.log(childId);
    await updateDoc(parentDocRef, {
      children: arrayUnion(childId),
    });
  }

  const onFileChange = async (e) => {
    let file = e.target.files[0];
    const storageRef = ref(storage, `${emailLogueado}/tweets/${file.name}`);
    await uploadBytes(storageRef, file);
    setImgFile(await getDownloadURL(storageRef));
  };

  useEffect(() => {
    setImgFile(null);
  }, []);

  return (
    <TweetFormWrapper>
      <ImagenPerfil
        src={datosUser.photoURL ? datosUser.photoURL : FotoPerfil}
        alt="foto de perfil"
      ></ImagenPerfil>
      <InputWrapper>
        <TweetInput
          type="text"
          id="detalles"
          onChange={handleChange}
          value={detalles}
          placeholder="¿Qué está pasando?"
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
