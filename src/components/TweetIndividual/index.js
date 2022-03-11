import {
    ImgPerfil,
    TweetContainer,
    TweetNav,
    TweetContent,
    Username,
    BorrarTweet,
    MainContainer,
    TweetHeader,
    MainUser,
    TweetMainContent,
    RespondingTo,
} from "./TweetIndividual.styles";

import { useEffect, useState } from "react/cjs/react.development";
import { useNavigate, Link } from "react-router-dom";
import { GiCancel } from "react-icons/gi";
import { BsThreeDotsVertical } from "react-icons/bs";
import ModalBase from "../ModalBase";
import { useGlobalContext } from "../../context/GlobalContext";
import "./ButtonGroup/ButtonGroup.styles";
import RelatedTweetLine from "../RelatedTweetLine";

import {
    doc,
    updateDoc,
    deleteDoc,
    getDoc,
    arrayRemove,
    arrayUnion,
    onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

import { format } from "fecha";

import ButtonGroup from "./ButtonGroup";
import TweetForm from "../TweetForm";
import imgPerfil from "../../imgs/perfil.jpg";
import BaseTweet from "../BaseTweet";

const TweetIndividual = ({ tweetId, mainTweet = false, lines, hasUp }) => {
    const [tweet, setTweet] = useState({});
    const [liked, setLiked] = useState(false);
    const [author, setAuthor] = useState({});
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const { emailLogueado, datosUser } = useGlobalContext();
    const [date, setDate] = useState(null);
    async function eliminarTweet(idTweetAEliminar) {
        //actualizar state con nuevo array
        /*const nuevoArrayTweets = arrayTweets.filter(
      (tweet) => tweet.id !== idTweetAEliminar
    );*/
        const tweetRef = doc(db, "tweets", idTweetAEliminar);
        const tweetSnap = await getDoc(tweetRef);
        if (tweetSnap.data().parentId) {
            const parentRef = doc(db, "tweets", tweetSnap.data().parentId);

            await updateDoc(parentRef, {
                children: arrayRemove(idTweetAEliminar),
            });
        }
        if (tweetSnap.data().children) {
            tweetSnap.data().children.forEach(async (child) => {
                await deleteDoc(doc(db, "tweets", child));
            });
        }
        //actualizar base de datos
        await deleteDoc(doc(db, "tweets", idTweetAEliminar));
    }

    async function likeTweet(e) {
        if (!emailLogueado) {
            alert("please login");
            return 0;
        }
        e.preventDefault();
        const tweetRef = doc(db, "tweets", tweetId);
        const tweetSnap = await getDoc(tweetRef);
        if (
            tweetSnap.data().likes &&
            tweetSnap.data().likes.includes(emailLogueado)
        ) {
            await updateDoc(tweetRef, {
                likes: arrayRemove(emailLogueado),
            });
        } else {
            await updateDoc(tweetRef, {
                likes: arrayUnion(emailLogueado),
            });
        }
    }

    // const getAuthor =
    //     }
    // };

    useEffect(() => {
        const tweetRef = doc(db, "tweets", tweetId);
        const unsubscribe = onSnapshot(tweetRef, (snap) => {
            if (snap.data()) setTweet(snap.data());
            else setTweet({});
            if (
                snap.data().likes &&
                snap.data().likes.includes(emailLogueado)
            ) {
                setLiked(true);
            } else {
                setLiked(false);
            }
        });
        return () => unsubscribe();
    }, [tweetId, emailLogueado]);

    const shortDate = () => {
        let tweetDate = new Date(tweet.timestamp);
        let currentDate = new Date();
        let diffInTime = currentDate - tweetDate;
        let mm = diffInTime / 1000 / 60;
        //si son menos de 60 minutos
        if (mm < 60) {
            return ` ${Math.floor(mm).toString()}m`;
        }
        //si son menos de 24 horas
        else if (mm / 60 < 24) {
            return `${Math.floor(mm / 60).toString()}h`;
        }
        //si son menos de 7 dias
        else if (mm / 60 / 24 < 7) {
            return `${Math.floor(mm / 60 / 24).toString()}d`;
        }
        //si no mostrar fecha
        else {
            return format(new Date(tweet.timestamp), "DD/MM");
        }
    };

    useEffect(() => {
        async function getAuthor() {
            if (Object.keys(tweet).length !== 0) {
                const userRef = doc(db, "usuarios", tweet.usuario);
                const userSnap = await getDoc(userRef);
                userSnap.data() ? setAuthor(userSnap.data()) : setAuthor({});
            } else {
                return null;
            }
        }
        console.log(tweet.timestamp);
        if (tweet.timestamp)
            setDate(
                mainTweet
                    ? format(new Date(tweet.timestamp), "h:m a · D MMM YYYY")
                    : shortDate()
            );
        getAuthor();
    }, [tweet, mainTweet]);

    const goTo = (e) => {
        if (e.currentTarget !== e.target) {
            if (
                !["A", "svg", "path", "FORM", "INPUT", "BUTTON"].includes(
                    e.target.nodeName
                )
            ) {
                navigate("/tweet/" + tweetId);
            } else {
                e.stopPropagation();
            }
        } else {
            navigate("/tweet/" + tweetId);
        }
    };

    const handleShowModal = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        setShowModal(!showModal);
    };

    if (mainTweet) {
        return (
            <MainContainer>
                <RelatedTweetLine hasUp={hasUp} />
                {console.log(hasUp, "HASUP")}
                {/* {hasUp && <div className="up"></div>} */}
                <TweetHeader>
                    <ImgPerfil>
                        <img src={imgPerfil} alt="" />
                    </ImgPerfil>

                    <MainUser>
                        <Username>Nombre</Username>
                        <span>{author && `@${author.ruta}`}</span>
                    </MainUser>

                    <BorrarTweet onClick={() => eliminarTweet(tweetId)}>
                        <BsThreeDotsVertical className="commentBtn" />
                    </BorrarTweet>
                </TweetHeader>
                <TweetMainContent>
                    {tweet.descripcion && <p>{tweet.descripcion}</p>}
                    <span></span>
                </TweetMainContent>
                <div>{date}</div>
                <ButtonGroup
                    replies={tweet.children ? tweet.children.length : null}
                    likes={tweet.likes ? tweet.likes.length : null}
                    likeTweet={likeTweet}
                    liked={liked}
                    main={mainTweet}
                    showForm={setShowModal}
                />

                <ModalBase showModal={showModal} setShowModal={setShowModal}>
                    <BaseTweet author={author} tweet={tweet}>
                        <RespondingTo>
                            Respondiendo a <span>{`@${author.ruta}`}</span>
                        </RespondingTo>
                        <RelatedTweetLine hasDown left={"23px"} />
                    </BaseTweet>
                    <TweetForm
                        parentId={tweetId}
                        className="tweetForm"
                        setShowModal={setShowModal}
                    >
                        <RelatedTweetLine hasUp left={"23px"} />
                    </TweetForm>
                </ModalBase>
            </MainContainer>
        );
    } else {
        return (
            <TweetContainer onClick={goTo} lines={lines ? lines : false}>
                {lines && (
                    <RelatedTweetLine
                        hasUp={lines.hasUp}
                        hasDown={lines.hasDown}
                    />
                )}

                {/* {lines.hasUp && <div className="up"></div>}
                {lines.hasDown && <div className="down"></div>} */}
                <BorrarTweet onClick={() => eliminarTweet(tweetId)}>
                    <BsThreeDotsVertical className="commentBtn" />
                </BorrarTweet>
                <ImgPerfil>
                    <img src={imgPerfil} alt="" />
                </ImgPerfil>
                <TweetNav>
                    <Username>Nombre</Username>
                    <span>{author && `@${author.ruta}`}</span>
                    <span>·</span>
                    <span>{date}</span>
                </TweetNav>
                <TweetContent>
                    {tweet.descripcion && <p>{tweet.descripcion}</p>}
                </TweetContent>
                <ButtonGroup
                    replies={tweet.children ? tweet.children.length : null}
                    likes={tweet.likes ? tweet.likes.length : null}
                    likeTweet={likeTweet}
                    liked={liked}
                    showForm={handleShowModal}
                />

                <ModalBase showModal={showModal} setShowModal={setShowModal}>
                    <BaseTweet author={author} tweet={tweet}>
                        <RespondingTo>
                            Respondiendo a <span>{`@${author.ruta}`}</span>
                        </RespondingTo>
                        <RelatedTweetLine hasDown left={"22px"} />
                        {/* <div
                            className="down modal"
                            style={{ left: "22px", z_index: 800 }}
                        ></div> */}
                    </BaseTweet>
                    <TweetForm
                        parentId={tweetId}
                        className="tweetForm"
                        setShowModal={setShowModal}
                    >
                        <RelatedTweetLine hasUp left="22px" />
                        {/* <div
                            className="up modal"
                            style={{ left: "22px" }}
                        ></div> */}
                    </TweetForm>
                </ModalBase>
            </TweetContainer>
        );
    }
};

export default TweetIndividual;
