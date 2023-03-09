import React from "react";
import BaseTweet from "../../BaseTweet";
import { RespondingTo } from "./ReplyModal.styles";
import ModalBase from "../Modals/ModalBase";
import TweetForm from "../../TweetForm";
import RelatedTweetLine from "../../RelatedTweetLine";

const ReplyModal = ({ showModal, setShowModal, author, tweet, tweetId }) => {
    return (
        <ModalBase showModal={showModal} setShowModal={setShowModal}>
            <BaseTweet author={author} tweet={tweet}>
                <RespondingTo>
                    Respondiendo a <span>{author && `@${author.ruta}`}</span>
                </RespondingTo>
                <RelatedTweetLine hasDown paddingLeft={"24px"} />
            </BaseTweet>
            <TweetForm parentId={tweetId} className="tweetForm" setShowModal={setShowModal}>
                <RelatedTweetLine hasUp paddingLeft={"24px"} />
            </TweetForm>
        </ModalBase>
    );
};

export default ReplyModal;
