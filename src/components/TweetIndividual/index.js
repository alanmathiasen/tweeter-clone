import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import { useTweet } from "../../hooks/useTweet";

import { deleteTweet, likeTweet, retweet } from "../../firebase/tweetCrud";

import RelatedTweetLine from "../RelatedTweetLine";
import Quote from "../Quote";
import QuoteModal from "../Quote/QuoteModal/index";
import ButtonGroup from "./ButtonGroup";

import { BsThreeDotsVertical } from "react-icons/bs";
import "./ButtonGroup/ButtonGroup.styles";
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
import imgPerfil from "../../imgs/perfil.jpg";

import { parseMentions } from "../../helpers/tweetHelper";
import ReplyModal from "../Modals/ReplyModal";
import DisplayUserWithPopup from "../common/Tags/DisplayUserWithPopup";

const TweetIndividual = ({ tweetId, mainTweet = false, lines, hasUp, children }) => {
    const {
        tweet,
        isLikedByUser,
        isRetweetedByUser,
        author,
        showReplyModal,
        setShowReplyModal,
        showQuoteModal,
        setShowQuoteModal,
        date,
        loading,
    } = useTweet({ tweetId, isMain: mainTweet });

    const navigate = useNavigate();
    const { emailLogueado } = useGlobalContext();

    async function handleDeleteTweet(e) {
        e.stopPropagation();
        await deleteTweet({ email: emailLogueado, tweet });
    }

    async function handleLikeTweet(e) {
        e.stopPropagation();
        if (!emailLogueado) {
            alert("please login");
            return 0;
        }

        await likeTweet({ email: emailLogueado, tweetId });
    }

    async function reTweet(e) {
        e.stopPropagation();
        if (!emailLogueado) {
            alert("please login");
            return 0;
        }
        await retweet({ email: emailLogueado, tweetId });
    }

    const goTo = (e) => {
        e.stopPropagation();
        navigate("/tweet/" + tweetId);
    };

    const handleShowModal = (e) => {
        e.stopPropagation();
        setShowReplyModal(true);
    };

    if (mainTweet) {
        return (
            <MainContainer>
                {loading ? (
                    <>Loading</>
                ) : (
                    <>
                        <RelatedTweetLine hasUp={hasUp} />
                        <TweetHeader>
                            <ImgPerfil>
                                <img
                                    src={(author && author.photoURL) || imgPerfil}
                                    referrerPolicy="no-referrer"
                                    alt="user profile"
                                />
                            </ImgPerfil>

                            <MainUser>
                                {author && (
                                    <DisplayUserWithPopup route={author.ruta}>
                                        <Username>{author && author.nombre}</Username>
                                    </DisplayUserWithPopup>
                                )}
                                <span>
                                    {author && (
                                        <DisplayUserWithPopup route={author.ruta}>@{author.ruta}</DisplayUserWithPopup>
                                    )}
                                </span>
                            </MainUser>

                            <BorrarTweet onClick={(e) => handleDeleteTweet(e, tweetId)}>
                                <BsThreeDotsVertical className="commentBtn" />
                            </BorrarTweet>
                        </TweetHeader>
                        <TweetMainContent>
                            {tweet.descripcion && <p>{parseMentions(tweet.descripcion)}</p>}
                            <span></span>
                            {tweet.quoteId ? <Quote tweetId={tweet.quoteId} /> : ""}
                        </TweetMainContent>
                        <div>{date}</div>
                        <ButtonGroup
                            replies={tweet.children ? tweet.children.length : null}
                            likes={tweet.likes ? tweet.likes.length : null}
                            likeTweet={handleLikeTweet}
                            liked={isLikedByUser}
                            main={mainTweet}
                            showForm={setShowReplyModal}
                            retweeted={isRetweetedByUser}
                            retweet={reTweet}
                            retweets={tweet.retweets ? tweet.retweets.length : null}
                            setQuoteModal={setShowQuoteModal}
                            quotes={tweet.quotes ? tweet.quotes.length : null}
                        />
                        <ReplyModal
                            showModal={showReplyModal}
                            setShowModal={setShowReplyModal}
                            author={author}
                            tweet={tweet}
                            tweetId={tweetId}
                        />
                        <QuoteModal
                            showModal={showQuoteModal}
                            setShowModal={setShowQuoteModal}
                            author={author}
                            tweet={tweet}
                        />
                    </>
                )}
            </MainContainer>
        );
    } else {
        return (
            <TweetContainer onClick={goTo} lines={lines ? lines : false}>
                {children}
                {lines && <RelatedTweetLine hasUp={lines.hasUp} hasDown={lines.hasDown} />}

                {/* {lines.hasUp && <div className="up"></div>}
                {lines.hasDown && <div className="down"></div>} */}
                <BorrarTweet onClick={(e) => handleDeleteTweet(e, tweetId)}>
                    <BsThreeDotsVertical className="commentBtn" />
                </BorrarTweet>
                <ImgPerfil>
                    <img
                        src={(author && author.photoURL) || imgPerfil}
                        referrerPolicy="no-referrer"
                        alt="user profile"
                    />
                </ImgPerfil>
                <TweetNav>
                    {author && (
                        <DisplayUserWithPopup route={author.ruta}>
                            <Username>{author && author.nombre}</Username>
                        </DisplayUserWithPopup>
                    )}
                    <span>
                        {author && <DisplayUserWithPopup route={author.ruta}>@{author.ruta}</DisplayUserWithPopup>}
                    </span>
                    <span>·</span>
                    <span>{date}</span>
                </TweetNav>
                <TweetContent>{tweet.descripcion && parseMentions(tweet.descripcion)}</TweetContent>
                <ButtonGroup
                    replies={tweet.children ? tweet.children.length : null}
                    likes={tweet.likes ? tweet.likes.length : null}
                    likeTweet={handleLikeTweet}
                    liked={isLikedByUser}
                    showForm={handleShowModal}
                    retweeted={isRetweetedByUser}
                    retweet={reTweet}
                    retweets={tweet.retweets ? tweet.retweets.length : null}
                    setQuoteModal={setShowQuoteModal}
                    quotes={tweet.quotes ? tweet.quotes.length : null}
                />
                {tweet.quoteId ? <Quote tweetId={tweet.quoteId} /> : <></>}
                <QuoteModal
                    showModal={showQuoteModal}
                    setShowModal={setShowQuoteModal}
                    author={author}
                    tweet={tweet}
                ></QuoteModal>
                <ReplyModal
                    showModal={showReplyModal}
                    setShowModal={setShowReplyModal}
                    author={author}
                    tweet={tweet}
                    tweetId={tweetId}
                />
            </TweetContainer>
        );
    }
};

export default TweetIndividual;
