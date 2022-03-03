import React from "react";

import { Overlay, Modal, CloseBtn } from "./ModalBase.styles";
import { VscClose } from "react-icons/vsc";

const ModalBase = ({ children, showModal, setShowModal }) => {
    const handleOverlayClick = (e) => {
        e.preventDefault();
        if (e.target === e.currentTarget) setShowModal(false);
    };
    return (
        <>
            {showModal && (
                <Overlay onClick={handleOverlayClick}>
                    <Modal>
                        <CloseBtn onClick={() => setShowModal(false)}>
                            <VscClose />
                        </CloseBtn>

                        {children}
                        {/* <TweetForm/> */}
                    </Modal>
                </Overlay>
            )}
        </>
    );
};

export default ModalBase;
