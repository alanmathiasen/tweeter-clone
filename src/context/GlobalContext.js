import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { getUsersByQuery } from "../firebase/userCrud";

const GlobalContext = React.createContext();

const AppProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState();
    const [emailLogueado, setEmailLogueado] = useState("asdasdsa");
    const [userData, setUserData] = useState();
    const [datosUser, setDatosUser] = useState({});
    const [tweettModal, setTweettModal] = useState(false);

    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) setLoggedUser(currentUser);
        else setLoggedUser(undefined);
    });

    useEffect(() => {
        //retry until user is created and retrieved from DB (this is because of google signup)

        if (loggedUser) {
            const interval = setInterval(async () => {
                const userDB = await getUsersByQuery("email", loggedUser.email);
                if (userDB.length === 0) {
                    console.log("failed");
                    return;
                }
                setUserData(userDB[0]);
                clearInterval(interval);
            }, 500);
        }
        setUserData(undefined);
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
                setUserData,
                datosUser,
                setDatosUser,
                tweettModal,
                setTweettModal,
                setEmailLogueado,
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
