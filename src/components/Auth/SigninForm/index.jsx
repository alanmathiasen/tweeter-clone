import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebaseConfig";
import { signInWithUser } from "../../../firebase/userCrud";
import AnimatedInput from "../../common/AnimatedInput";
import { SpanError } from "../../common/AnimatedInput/AnimatedInput.styles";
import { ButtonRegister } from "../../common/buttons.styles";
import { FormWrapper } from "./SigninForm.styles";
import { useModalContext } from "../../../context/ModalContext";
import { GoToLogin } from "../../RightMenu/RightMenu.styles";
const SigninForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState();
    const { isSigninModalOpen, setIsSigninModalOpen, setIsRegisterModalOpen } = useModalContext();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validateErrors = validateForm();
            if (Object.keys(validateErrors).length !== 0) {
                setErrors(validateErrors);
                return;
            }

            await signInWithUser(username, password);
            setIsSigninModalOpen(false);
            navigate("/");
        } catch (error) {
            setErrorMessage(error.code ?? error.message ?? null);
        }
        // }
    };

    const validateForm = () => {
        let validateErrors = {};

        if (username.length === 0) validateErrors.username = "Debes ingresar un nombre";
        if (username.length > 50) validateErrors.username = "El nombre no debe superar los 50 caracteres";

        if (password.length === 0) validateErrors.password = "Debes ingresar un password";
        if (password.length < 6) validateErrors.password = "El password debe tener mas de 6 caracteres";

        return validateErrors;
    };

    const handleChange = (target, setValue) => {
        if (Object.keys(errors) !== 0) {
            const newErrors = { ...errors };
            delete newErrors[target.name];
            setErrors(newErrors);
        }
        setValue(target.value);
    };

    const handleShowRegister = (e) => {
        e.stopPropagation();
        setIsSigninModalOpen(false);
        setIsRegisterModalOpen(true);
    };

    return (
        <FormWrapper>
            <AnimatedInput
                title="Nombre de usuario"
                name="name"
                value={username}
                onChange={(e) => handleChange(e.target, setUsername)}
                error={errors.name}
            />
            <AnimatedInput
                title="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => handleChange(e.target, setPassword)}
                error={errors.password}
            />
            {errorMessage && (
                <SpanError>
                    <span>{errorMessage}</span>{" "}
                </SpanError>
            )}
            <ButtonRegister onClick={handleSubmit}>Iniciar sesión</ButtonRegister>
            <GoToLogin>
                No tenes cuenta? <span onClick={handleShowRegister}>Registrate</span>
            </GoToLogin>
        </FormWrapper>
    );
};

export default SigninForm;
