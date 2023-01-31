import { useEffect, useState } from "react/cjs/react.development";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

import RelatedTweetLine from "../RelatedTweetLine";
import Quote from "../Quote";
import QuoteModal from "../Quote/QuoteModal/index";

import { BsThreeDotsVertical } from "react-icons/bs";

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
} from "./TweetIndividual.styles";
import "./ButtonGroup/ButtonGroup.styles";

import { deleteTweet, getAuthor, likeTweet, retweet } from "../../firebase/getters";
import ButtonGroup from "./ButtonGroup";
import imgPerfil from "../../imgs/perfil.jpg";
import ReplyModal from "../Modals/ReplyModal";
import { useTweet } from "../../hooks/useTweet";

const TweetIndividual = ({ tweet, mainTweet = false, lines, hasUp, children }) => {
    const { emailLogueado } = useGlobalContext();
    const navigate = useNavigate();
    // const [liked, setLiked] = useState(false);
    const [author, setAuthor] = useState({});
    const [replyModal, setReplyModal] = useState(false);
    const [quoteModal, setQuoteModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(null);

    const { state, dispatch } = useTweet({ tweetId: tweet.id, isMain: mainTweet });

    function isLoggedIn() {}
    //gets author and sets date

    useEffect(() => {
        try {
            (async () => {
                setAuthor(await getAuthor(tweet.usuario));
                // console.log(tweet.usuario);
                //setAuthor("AUTHOR");
            })();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [tweet]);

    const goTo = (e) => {
        e.stopPropagation();
        navigate("/tweet/" + tweet.id);
    };

    const handleShowModal = (e) => {
        e.stopPropagation();
        if (!emailLogueado) {
            alert("please login");
            return;
        }
        setReplyModal(true);
    };

    const eliminarTweet = async (e) => {
        e.stopPropagation();
        if (!emailLogueado) {
            alert("please login");
            return;
        }
        await deleteTweet(tweet, emailLogueado);
    };

    const handleLikeTweet = async (e) => {
        e.stopPropagation();
        if (!emailLogueado) {
            alert("please login");
            return;
        }
        console.log(emailLogueado);
        await likeTweet(tweet.id, emailLogueado);
    };

    const handleRetweet = async (e) => {
        e.stopPropagation();
        if (!emailLogueado) {
            alert("please login");
            return;
        }
        await retweet(tweet.id, emailLogueado);
    };

    if (loading) return <></>;

    return (
        <>
            {mainTweet ? (
                <MainContainer>
                    <RelatedTweetLine hasUp={hasUp} />
                    <TweetHeader>
                        <ImgPerfil>
                            <img src={author && author.photoURL ? author.photoURL : imgPerfil} alt="" />
                        </ImgPerfil>

                        <MainUser>
                            <Username>{author && author.nombre}</Username>
                            <span>{author && `@${author.ruta}`}</span>
                        </MainUser>

                        <BorrarTweet onClick={(e) => eliminarTweet(e, tweet.id)}>
                            <BsThreeDotsVertical className="commentBtn" />
                        </BorrarTweet>
                    </TweetHeader>
                    <TweetMainContent>
                        {tweet.descripcion && <p>{tweet.descripcion}</p>}
                        <span></span>
                        {tweet.quoteId ? <Quote tweetId={tweet.quoteId} /> : ""}
                    </TweetMainContent>
                    <div>{state.date}</div>

                    <ButtonGroup
                        replies={tweet.children ? tweet.children.length : null}
                        likes={state.likes > 0 ? state.likes : null}
                        likeTweet={handleLikeTweet}
                        liked={state.isLiked}
                        main={mainTweet}
                        showForm={setReplyModal}
                        retweeted={state.isRetweeted}
                        retweet={handleRetweet}
                        retweets={state.retweets > 0 ? state.retweets : null}
                        setQuoteModal={setQuoteModal}
                        quotes={state.quotes > 0 ? state.quotes : null}
                    />
                </MainContainer>
            ) : (
                <TweetContainer onClick={goTo} lines={lines ? lines : false}>
                    {children}
                    {lines && <RelatedTweetLine hasUp={lines.hasUp} hasDown={lines.hasDown} />}
                    {/* {lines.hasUp && <div className="up"></div>} */}
                    {/* //{lines.hasDown && <div className="down"></div>} */}
                    <BorrarTweet onClick={(e) => eliminarTweet(e, tweet.id)}>
                        <BsThreeDotsVertical className="commentBtn" />
                    </BorrarTweet>
                    <ImgPerfil>
                        <img src={author && author.photoURL ? author.photoURL : imgPerfil} alt="" />
                    </ImgPerfil>
                    <TweetNav>
                        <Username>{author && author.nombre}</Username>
                        <span>{author && `@${author.ruta}`}</span>
                        <span>·</span>
                        <span>{state.date}</span>
                    </TweetNav>
                    <TweetContent>{tweet.descripcion && <p>{tweet.descripcion}</p>}</TweetContent>
                    <ButtonGroup
                        replies={tweet.children ? tweet.children.length : null}
                        likes={state.likes > 0 ? state.likes : null}
                        likeTweet={handleLikeTweet}
                        liked={state.isLiked}
                        showForm={setReplyModal}
                        retweeted={state.isRetweeted}
                        retweet={handleRetweet}
                        retweets={state.retweets > 0 ? state.retweets : null}
                        setQuoteModal={setQuoteModal}
                        quotes={state.quotes > 0 ? state.quotes : null}
                    />
                    {tweet.quoteId ? <Quote tweetId={tweet.quoteId} /> : <></>}
                    <QuoteModal showModal={quoteModal} setShowModal={setQuoteModal} author={author} tweet={tweet} />
                    <ReplyModal
                        showModal={replyModal}
                        setShowModal={setReplyModal}
                        author={author}
                        tweet={state.tweet}
                        tweetId={tweet.id}
                    />
                </TweetContainer>
            )}
        </>
    );
};

export default TweetIndividual;
