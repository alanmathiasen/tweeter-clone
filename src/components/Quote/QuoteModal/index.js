import React from "react";
import ModalBase from "../../ModalBase";

import TweetForm from "../../TweetForm";

import { Wrapper } from "./QuoteModal.styles.js";
import Quote from "../index";
const QuoteModal = ({ showModal, setShowModal, author, tweet }) => {
    return (
        <>
            <ModalBase showModal={showModal} setShowModal={setShowModal}>
                <TweetForm
                    quoteId={tweet.id}
                    className="tweetForm"
                    setShowModal={setShowModal}
                >
                    <Quote tweetId={tweet.id}></Quote>
                </TweetForm>
            </ModalBase>
        </>
    );
};

export default QuoteModal;
