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
import DisplayUserWithPopover from "../common/Tags/DisplayUserWithPopover";
import Loader from "../common/Loader";

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
    const { userData } = useGlobalContext();

    async function handleDeleteTweet(e) {
        e.stopPropagation();
        await deleteTweet({ email: userData.email, tweet });
    }

    async function handleLikeTweet(e) {
        e.stopPropagation();
        if (!userData) {
            alert("please login");
            return 0;
        }

        await likeTweet({ email: userData.email, tweetId });
    }

    async function reTweet(e) {
        e.stopPropagation();
        if (!userData) {
            alert("please login");
            return 0;
        }
        await retweet({ email: userData.email, tweetId });
    }

    const goTo = (e) => {
        e.stopPropagation();
        navigate("/tweet/" + tweetId);
    };

    const handleShowModal = (e) => {
        e.stopPropagation();
        setShowReplyModal(true);
    };

    if (loading) return <Loader />;
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
                                    <DisplayUserWithPopover route={author.route}>
                                        <Username>{author && author.username}</Username>
                                    </DisplayUserWithPopover>
                                )}
                                <span>
                                    {author && (
                                        <DisplayUserWithPopover route={author.route}>
                                            @{author.route}
                                        </DisplayUserWithPopover>
                                    )}
                                </span>
                            </MainUser>

                            <BorrarTweet onClick={(e) => handleDeleteTweet(e, tweetId)}>
                                <BsThreeDotsVertical className="commentBtn" />
                            </BorrarTweet>
                        </TweetHeader>
                        <TweetMainContent>
                            {tweet.description && <p>{parseMentions(tweet.description)}</p>}
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
                        alt={`${author && author.username}`}
                    />
                </ImgPerfil>
                <TweetNav>
                    {author && (
                        <DisplayUserWithPopover route={author.route}>
                            <Username>{author && author.username}</Username>
                        </DisplayUserWithPopover>
                    )}
                    <span>
                        {author && (
                            <DisplayUserWithPopover route={author.route}>@{author.route}</DisplayUserWithPopover>
                        )}
                    </span>
                    <span>·</span>
                    <span>{date}</span>
                </TweetNav>
                <TweetContent>{tweet.description && parseMentions(tweet.description)}</TweetContent>
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
