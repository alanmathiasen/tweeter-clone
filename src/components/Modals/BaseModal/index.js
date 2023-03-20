import React from "react";

import { Overlay, Modal, CloseBtn } from "./BaseModal.styles";
import { VscClose } from "react-icons/vsc";

const BaseModal = ({ children, showModal, setShowModal }) => {
    const handleOverlayClick = (e) => {
        e.stopPropagation();
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
                    </Modal>
                </Overlay>
            )}
        </>
    );
};

export default BaseModal;
