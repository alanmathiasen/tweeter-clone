import React from "react";
import TweetForm from "../../TweetForm";
import BaseModal from "../BaseModal";
import { Wrapper } from "./TweetModal.styles";

const TweetModal = ({ showModal, setShowModal }) => {
    return (
        <BaseModal showModal={showModal} setShowModal={setShowModal}>
            <Wrapper>
                <TweetForm className="tweetForm" setShowModal={setShowModal} />
            </Wrapper>
        </BaseModal>
    );
};

export default TweetModal;
