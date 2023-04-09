import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../../firebase/auth";
import { ButtonRegister } from "../buttons.styles";
import GoogleSVG from "../GoogleSVG";

const GoogleButton = ({ children }) => {
    const navigate = useNavigate();

    const handleSignInWithGoogle = async () => {
        try {
            await signInWithGoogle();
            navigate("/");
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
