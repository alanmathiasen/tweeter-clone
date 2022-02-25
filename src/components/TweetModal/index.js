import React from "react";
import { ModalWrapper, CloseBtn, TweetFormWrapper } from "./TweetModal.styles";
import { useGlobalContext } from "../../context/GlobalContext";
import TweetForm from "../TweetForm";
import { VscClose } from "react-icons/vsc";

const TweetModal = ({ isReply }) => {
  const { tweettModal, handleTweettModal } = useGlobalContext();

  return (
    <ModalWrapper tweettModal={tweettModal}>
      <div>
        <CloseBtn onClick={() => handleTweettModal()}>
          <VscClose />
        </CloseBtn>
      </div>

      <TweetFormWrapper>
        <TweetForm />
      </TweetFormWrapper>
    </ModalWrapper>
  );
};

export default TweetModal;
