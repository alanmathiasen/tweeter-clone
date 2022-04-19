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
    TweetMedia,
} from "./TweetIndividual.styles";

import { useEffect, useState } from "react/cjs/react.development";
import { useNavigate, Link } from "react-router-dom";
import { GiCancel } from "react-icons/gi";
import { BsThreeDotsVertical } from "react-icons/bs";
import ModalBase from "../ModalBase";
import { useGlobalContext } from "../../context/GlobalContext";
import "./ButtonGroup/ButtonGroup.styles";
import RelatedTweetLine from "../RelatedTweetLine";
import Quote from "../Quote";
import QuoteModal from "../Quote/QuoteModal/index";

import {
    doc,
    updateDoc,
    deleteDoc,
    getDoc,
    arrayRemove,
    arrayUnion,
    onSnapshot,
    addDoc,
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

import { getAuthor } from "../../firebase/getters";
import { format } from "fecha";
import { shortDate } from "../../helpers/dateHelper";
import ButtonGroup from "./ButtonGroup";
import TweetForm from "../TweetForm";
import imgPerfil from "../../imgs/perfil.jpg";
import BaseTweet from "../BaseTweet";
import TweetsNavbar from "../TweetsNavbar";

const TweetIndividual = ({
    tweetId,
    mainTweet = false,
    lines,
    hasUp,
    children,
    quote = {},
}) => {
    const [tweet, setTweet] = useState({});
    const [liked, setLiked] = useState(false);
    const [retweeted, setRetweeted] = useState(false);
    const [author, setAuthor] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [quoteModal, setQuoteModal] = useState(false);

    const navigate = useNavigate();

    const { emailLogueado, datosUser } = useGlobalContext();
    const [date, setDate] = useState(null);
    async function eliminarTweet(e, idTweetAEliminar) {
        e.stopPropagation();
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

        const q = query(
            collection(db, "tweets"),
            where("retweet", "==", idTweetAEliminar)
        );
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot, "query");
        querySnapshot.forEach((doc) => {
            console.log(doc, "eliminando");
            deleteDoc(doc.ref);
        });
    }

    async function likeTweet(e) {
        e.stopPropagation();
        e.preventDefault();
        if (!emailLogueado) {
            alert("please login");
            return 0;
        }

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

    async function reTweet(e) {
        e.stopPropagation();
        e.preventDefault();

        if (!emailLogueado) {
            alert("please login");
            return 0;
        }
        const tweetRef = doc(db, "tweets", tweetId);
        const tweetSnap = await getDoc(tweetRef);
        if (
            tweetSnap.data().retweets &&
            tweetSnap.data().retweets.includes(emailLogueado)
        ) {
            await updateDoc(tweetRef, {
                retweets: arrayRemove(emailLogueado),
            });

            const q = query(
                collection(db, "tweets"),
                where("parent", "==", emailLogueado),
                where("retweet", "==", tweetId)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                deleteDoc(doc.ref);
            });
        } else {
            await updateDoc(tweetRef, {
                retweets: arrayUnion(emailLogueado),
            });
            await addDoc(collection(db, "tweets"), {
                parent: emailLogueado,
                retweet: tweetId,
                timestamp: +new Date(),
            });
        }
    }

    useEffect(() => {
        const tweetRef = doc(db, "tweets", tweetId);
        const unsubscribe = onSnapshot(tweetRef, (snap) => {
            if (snap.data()) {
                setTweet({ id: tweetId, ...snap.data() });
                if (
                    snap.data().likes &&
                    snap.data().likes.includes(emailLogueado)
                ) {
                    setLiked(true);
                } else {
                    setLiked(false);
                }
                if (
                    snap.data().retweets &&
                    snap.data().retweets.includes(emailLogueado)
                ) {
                    console.log(snap.data().retweets);
                    setRetweeted(true);
                } else {
                    setRetweeted(false);
                }
            } else setTweet({});
        });
        return () => unsubscribe();
    }, [tweetId, emailLogueado]);

    useEffect(() => {
        // async function getAuthor() {
        //     if (Object.keys(tweet).length !== 0) {
        //         const userRef = doc(db, "usuarios", tweet.usuario);
        //         const userSnap = await getDoc(userRef);
        //         userSnap.data() ? setAuthor(userSnap.data()) : setAuthor({});
        //     } else {
        //         return null;
        //     }
        // }
        (async () => {
            setAuthor(await getAuthor(tweet));
        })();
        if (tweet.timestamp)
            setDate(
                mainTweet
                    ? format(new Date(tweet.timestamp), "h:m a · D MMM YYYY")
                    : shortDate(tweet.timestamp)
            );
        //getAuthor();
    }, [tweet, mainTweet]);

    const goTo = (e) => {
        navigate("/tweet/" + tweetId);
    };

    const handleShowModal = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setShowModal(!showModal);
    };

    if (mainTweet) {
        return (
            <MainContainer>
                <RelatedTweetLine hasUp={hasUp} />
                <TweetHeader>
                    <ImgPerfil>
                        <img src={imgPerfil} alt="" />
                    </ImgPerfil>

                    <MainUser>
                        <Username>Nombre</Username>
                        <span>{author && `@${author.ruta}`}</span>
                    </MainUser>

                    <BorrarTweet onClick={(e) => eliminarTweet(e, tweetId)}>
                        <BsThreeDotsVertical className="commentBtn" />
                    </BorrarTweet>
                </TweetHeader>
                <TweetMainContent>
                    {tweet.descripcion && <p>{tweet.descripcion}</p>}
                    <span></span>
                    {tweet.quoteId ? <Quote tweetId={tweet.quoteId} /> : ""}
                </TweetMainContent>
                <div>{date}</div>

                <ButtonGroup
                    replies={tweet.children ? tweet.children.length : null}
                    likes={tweet.likes ? tweet.likes.length : null}
                    likeTweet={likeTweet}
                    liked={liked}
                    main={mainTweet}
                    showForm={setShowModal}
                    retweeted={retweeted}
                    retweet={reTweet}
                    retweets={tweet.retweets ? tweet.retweets.length : null}
                    setQuoteModal={setQuoteModal}
                />

                <ModalBase showModal={showModal} setShowModal={setShowModal}>
                    <BaseTweet author={author} tweet={tweet}>
                        <RespondingTo>
                            Respondiendo a{" "}
                            <span>{author && `@${author.ruta}`}</span>
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
                <QuoteModal
                    showModal={quoteModal}
                    setShowModal={setQuoteModal}
                    author={author}
                    tweet={tweet}
                ></QuoteModal>
            </MainContainer>
        );
    } else {
        return (
            <>
                <TweetContainer onClick={goTo} lines={lines ? lines : false}>
                    {children}
                    {lines && (
                        <RelatedTweetLine
                            hasUp={lines.hasUp}
                            hasDown={lines.hasDown}
                        />
                    )}

                    {/* {lines.hasUp && <div className="up"></div>}
                {lines.hasDown && <div className="down"></div>} */}
                    <BorrarTweet onClick={(e) => eliminarTweet(e, tweetId)}>
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
                        retweeted={retweeted}
                        retweet={reTweet}
                        retweets={tweet.retweets ? tweet.retweets.length : null}
                        setQuoteModal={setQuoteModal}
                    />
                    {tweet.quoteId ? <Quote tweetId={tweet.quoteId} /> : <></>}
                    <QuoteModal
                        showModal={quoteModal}
                        setShowModal={setQuoteModal}
                        author={author}
                        tweet={tweet}
                    ></QuoteModal>
                    <ModalBase
                        showModal={showModal}
                        setShowModal={setShowModal}
                    >
                        <BaseTweet author={author} tweet={tweet}>
                            <RespondingTo>
                                Respondiendo a{" "}
                                <span>{author && `@${author.ruta}`}</span>
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
            </>
        );
    }
};

export default TweetIndividual;
