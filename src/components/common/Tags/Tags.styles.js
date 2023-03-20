import styled from "styled-components";

export const Popup = styled.div`
    border: 1px solid #ccc;
    border-radius: 14px;
    padding: 14px;
    background: #fff;
    visibility: hidden;
    &[data-show="true"] {
        ${console.log("hola")}
        visibility: visible;
    }
`;

export const Name = styled.span``;

export const Wrapper = styled.div`
    display: inline-block;
`;
