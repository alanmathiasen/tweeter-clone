import React from "react";
import BaseTweet from "../../BaseTweet";
import { ReplyWrapper, RespondingTo } from "./ReplyModal.styles";
import BaseModal from "../BaseModal";
import TweetForm from "../../TweetForm";
import RelatedTweetLine from "../../RelatedTweetLine";

const ReplyModal = ({ showModal, setShowModal, author, tweet, tweetId }) => {
    return (
        <BaseModal showModal={showModal} setShowModal={setShowModal}>
            <ReplyWrapper>
                <BaseTweet author={author} tweet={tweet}>
                    <RespondingTo>
                        Respondiendo a <span>{author && `@${author.route}`}</span>
                    </RespondingTo>
                    <RelatedTweetLine hasDown paddingLeft={"24px"} />
                </BaseTweet>
                <TweetForm parentId={tweetId} className="tweetForm" setShowModal={setShowModal}>
                    <RelatedTweetLine hasUp paddingLeft={"24px"} />
                </TweetForm>
            </ReplyWrapper>
        </BaseModal>
    );
};

export default ReplyModal;
