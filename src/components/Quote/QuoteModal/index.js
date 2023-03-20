import React from "react";
import BaseModal from "../../Modals/BaseModal";

import TweetForm from "../../TweetForm";

import { Wrapper } from "./QuoteModal.styles.js";
import Quote from "../index";
const QuoteModal = ({ showModal, setShowModal, author, tweet }) => {
    return (
        <>
            <BaseModal showModal={showModal} setShowModal={setShowModal}>
                <TweetForm quoteId={tweet.id} className="tweetForm" setShowModal={setShowModal}>
                    <Quote tweetId={tweet.id}></Quote>
                </TweetForm>
            </BaseModal>
        </>
    );
};

export default QuoteModal;
