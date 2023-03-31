import React, { useState, useContext, useEffect } from "react";

const ModalContext = React.createContext();

const ModalProvider = ({ children }) => {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isSigninModalOpen, setIsSigninModalOpen] = useState(false);

    return (
        <ModalContext.Provider
            value={{
                isRegisterModalOpen,
                setIsRegisterModalOpen,
                isSigninModalOpen,
                setIsSigninModalOpen,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export const useModalContext = () => {
    return useContext(ModalContext);
};

export { ModalContext, ModalProvider };
