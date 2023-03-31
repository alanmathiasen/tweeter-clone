import React from "react";
import { signInWithGoogle } from "../../../firebase/auth";
import { ButtonRegister } from "../buttons.styles";
import GoogleSVG from "../GoogleSVG";

const GoogleButton = ({ children }) => {
    const handleSignInWithGoogle = async () => {
        try {
            await signInWithGoogle();
        } catch (err) {
            //TODO HANDLE ERROR
            alert(err);
        }
    };
    return (
        <ButtonRegister onClick={handleSignInWithGoogle}>
            <GoogleSVG width="20px" height="20px" /> {children}
        </ButtonRegister>
    );
};

export default GoogleButton;
