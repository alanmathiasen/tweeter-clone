import { VscComment, VscGitCompare, VscFoldUp } from "react-icons/vsc";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

import { Wrapper, MainWrapper, Stats, Buttons } from "./ButtonGroup.styles";

const ButtonGroup = ({
    replies,
    likes,
    likeTweet,
    liked,
    showForm,
    main,
    retweet,
    retweeted,
    retweets,
    setQuoteModal,
    quotes,
}) => {
    return main ? (
        <MainWrapper>
            {(likes > 0 || retweets > 0 || quotes > 0) && (
                <Stats>
                    <span>{retweets ? `${retweets} Retweets` : ""}</span>
                    <span>{likes ? `${likes} Me gusta` : ""}</span>
                    <span>{quotes ? `${quotes} Veces citado` : ""}</span>
                </Stats>
            )}
            <Buttons>
                <div>
                    <span
                        className="comment"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            showForm(true);
                        }}
                    >
                        <VscComment className="commentBtn" />
                    </span>
                </div>
                <div>
                    <span className="retweet" onClick={(e) => retweet(e)}>
                        <VscGitCompare className={retweeted ? "retweetBtn retweeted" : "retweetBtn"} />
                    </span>
                </div>
                <div>
                    {liked ? (
                        <span className="like liked" onClick={likeTweet} href="#">
                            <IoHeartSharp className="likeBtn" />
                        </span>
                    ) : (
                        <span className="like " onClick={likeTweet}>
                            <IoHeartOutline className="likeBtn" />
                        </span>
                    )}
                </div>
                <div>
                    <span
                        className="comment"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setQuoteModal(true);
                        }}
                    >
                        <VscFoldUp className="commentBtn" />
                    </span>
                </div>
            </Buttons>
        </MainWrapper>
    ) : (
        <Wrapper>
            <div>
                <span className="comment" href="#" onClick={showForm}>
                    <VscComment className="commentBtn" />
                    <span>{replies ? replies : ""}</span>
                </span>
            </div>
            <div>
                <span className={retweeted ? "retweet retweeted" : "retweet"} href="#" onClick={retweet}>
                    <VscGitCompare className="retweetBtn" />
                    <span>{retweets > 0 ? retweets : ""}</span>
                </span>
            </div>
            <div>
                {liked ? (
                    <span className="like liked" onClick={likeTweet}>
                        <IoHeartSharp className="likeBtn" />
                        <span>{likes ? likes : ""}</span>
                    </span>
                ) : (
                    <span className="like " onClick={likeTweet}>
                        <IoHeartOutline className="likeBtn" />
                        <span>{likes ? likes : ""}</span>
                    </span>
                )}
            </div>
            <div>
                <span
                    className="comment"
                    onClick={(e) => {
                        e.stopPropagation();
                        setQuoteModal(true);
                    }}
                >
                    <VscFoldUp className="commentBtn" />
                    <span>{quotes ? quotes : ""}</span>
                </span>
            </div>
        </Wrapper>
    );
};

export default ButtonGroup;
