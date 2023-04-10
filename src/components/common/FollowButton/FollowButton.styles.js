import styled from "styled-components";
import { RoundedButton } from "../buttons.styles";

export const BtnSeguir = styled.button`
    display: flex;
    float: right;
    background: none;
    border: solid 1px #e1e8ed;
    border-radius: 50px;
    font-size: 1rem;
    padding: 0.5rem 1.2rem;
    margin: 1rem;
    font-weight: 600;
    max-width: ${(props) => (props.maxWidth ? props.maxWidth : "100px")};
    cursor: pointer;
    max-height: 40px;
    line-height: 1.2;
    color: ${(props) => (props.itsCurrentUserProfile || props.color ? props.color : "#fff")};
    background-color: ${(props) => (props.itsCurrentUserProfile || props.bg ? props.bg : "#000")};

    cursor: pointer;
    &:hover span {
        display: none;
    }
    &:hover:before {
        content: "${(props) => props.contentTxt}";
        display: absolute;
    }

    &:hover {
        color: ${(props) => (props.hoverColor ? props.hoverColor : props.btnState ? "red" : "#fff")};
        background-color: ${(props) =>
            props.hoverBgColor ? props.hoverBgColor : props.btnState ? "#ff9f9f" : "#23292E"};
    }
`;

export const Following = styled(RoundedButton)`
    height: 34px;
    padding: 0 16px;
    font-size: 15px;
    color: #fff;
    font-weight: bold;
    background-color: #0f1419;
    border-color: #000;
    &:hover {
        background-color: #272c30;
        border-color: #272c30;
    }
`;

export const StopFollowing = styled(RoundedButton)`
    height: 34px;
    padding: 10px 16px;
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.grey};
    &:hover {
        background-color: #f0dcdd;
        //TODO FIND THIS COLOR
        border-color: rgba(238, 98, 98, 0.6);
        color: ${({ theme }) => theme.colors.main};
    }
`;
