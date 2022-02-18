import React from "react";
import { ModalWrapper } from "./TweetModal.styles";
import { useGlobalContext } from "../../context/GlobalContext";
import TweetForm from "../TweetForm";

const TweetModal = () => {
  const { tweettModal } = useGlobalContext();

  return (
    <ModalWrapper tweettModal={tweettModal}>
      <TweetForm />
    </ModalWrapper>
  );
};

export default TweetModal;
