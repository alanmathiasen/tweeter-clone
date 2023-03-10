import styled from "styled-components";

export const TweetFormWrapper = styled.form`
    display: flex;
    padding: 16px 0px;
    width: 100%;
    position: relative;
    margin: 0;
`;

export const ButtonTwittear = styled.button`
    border: none;
`;

export const ImagenPerfil = styled.img`
    height: 48px;
    width: 48px;
    border-radius: 9999px;
`;

export const InputWrapper = styled.div`
    width: 100%;
    margin: 0 0.5rem;
    button {
        display: flex;
        float: right;
        padding: 0.5rem 1.5rem;
    }
`;

export const TweetInput = styled.input`
    width: 100%;
    border: none;
    padding: 1rem;
    outline: none;
    font-size: 1.2rem;
    ::placeholder {
        font-size: 1.5rem;
    }
`;
