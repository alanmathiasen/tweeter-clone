import styled from "styled-components";

export const TweetFormWrapper = styled.form`
    display: flex;
    padding: 16px 0px;
    width: 100%;
    grid: 1fr 8fr;
    position: relative;
    margin: 0;

    display: grid;
    width: 100%;
    position: relative;
    grid-template-columns: 1fr 8fr;

    .mentions {
        margin: 0;
        position: relative;
    }

    .mentions--singleLine .mentions__control {
        display: inline-block;
        width: 130px;
    }
    .mentions--singleLine .mentions__highlighter {
        padding: 1px;
        border: 2px inset transparent;
    }
    .mentions--singleLine .mentions__input {
        padding: 1px;
        padding-left: 0;
        border: 2px inset;
    }

    .mentions--multiLine .mentions__control {
        font-size: 14pt;
    }

    .mentions--multiLine .mentions__highlighter {
        border: 1px solid transparent;
        padding: 9px;
        min-height: 63px;
    }
    .mentions--multiLine .mentions__input {
        border: 1px solid transparent;
        padding: 9px;
        padding-left: 0;
        outline: 0;
    }

    .mentions__suggestions__list {
        background-color: white;
        border: 1px solid rgba(0, 0, 0, 0.15);
        font-size: 10pt;
        position: absolute;
        top: 0 !important;
        left: 0 !important;
    }

    .mentions__suggestions__item {
        padding: 5px 15px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    }

    .mentions__suggestions__item--focused {
        background-color: #cee4e5;
    }

    .mentions__mention {
        position: relative;
        z-index: 1;
        color: blue;
        text-shadow: 1px 1px 1px white, 1px -1px 1px white, -1px 1px 1px white, -1px -1px 1px white;
        pointer-events: none;
    }
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
    //width: 90%;
    //margin: 0 0.5rem;
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
