import React, { useState, useContext, useEffect } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { onAuthStateChanged, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { getUsersByQuery } from "../firebase/userCrud";

const GlobalContext = React.createContext();

const AppProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState();
    const [emailLogueado, setEmailLogueado] = useState("");
    const [userData, setUserData] = useState();
    const [datosUser, setDatosUser] = useState({});
    const [tweettModal, setTweettModal] = useState(false);

    onAuthStateChanged(auth, (currentUser) => {
        setLoggedUser(currentUser);
    });

    useEffect(() => {
        (async () => {
            if (loggedUser) {
                const userDB = await getUsersByQuery("email", loggedUser.email);
                setUserData(userDB[0]);
                setDatosUser(userDB[0]);
            } else {
                setUserData(undefined);
            }
        })();
    }, [loggedUser]);

    const handleTweettModal = () => {
        setTweettModal(!tweettModal);
    };

    return (
        <GlobalContext.Provider
            value={{
                loggedUser,
                emailLogueado,
                userData,
                datosUser,
                setDatosUser,
                tweettModal,
                setTweettModal,
                handleTweettModal,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export { GlobalContext, AppProvider };
