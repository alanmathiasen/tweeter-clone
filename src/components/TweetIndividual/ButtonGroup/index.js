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
}) => {
    return main ? (
        <MainWrapper>
            {(likes > 0 || retweets > 0) && (
                <Stats>
                    <span>{retweets ? `${retweets} Retweets` : ""}</span>
                    <span>{likes ? `${likes} Me gusta` : ""}</span>
                </Stats>
            )}
            <Buttons>
                <div>
                    <a
                        className="comment"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            showForm(true);
                        }}
                    >
                        <VscComment className="commentBtn" />
                    </a>
                </div>
                <div>
                    <a className="retweet" onClick={(e) => retweet(e)}>
                        <VscGitCompare
                            className={
                                retweeted
                                    ? "retweetBtn retweeted"
                                    : "retweetBtn"
                            }
                        />
                    </a>
                </div>
                <div>
                    {liked ? (
                        <a className="like liked" onClick={likeTweet} href="#">
                            <IoHeartSharp className="likeBtn" />
                        </a>
                    ) : (
                        <a className="like " onClick={likeTweet}>
                            <IoHeartOutline className="likeBtn" />
                        </a>
                    )}
                </div>
                <div>
                    <a
                        className="comment"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setQuoteModal(true);
                        }}
                    >
                        <VscFoldUp className="commentBtn" />
                    </a>
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
                <span
                    className={retweeted ? "retweet retweeted" : "retweet"}
                    href="#"
                    onClick={retweet}
                >
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
                        e.preventDefault();

                        setQuoteModal(true);
                    }}
                >
                    <VscFoldUp className="commentBtn" />
                    <span>30</span>
                </span>
            </div>
        </Wrapper>
    );
};

export default ButtonGroup;
