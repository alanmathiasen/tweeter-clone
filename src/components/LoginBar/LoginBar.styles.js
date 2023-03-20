import styled from "styled-components";

export const BarWrapper = styled.div`
    background-color: ${(props) => props.theme.colors.main};
    display: flex;
    position: fixed;
    margin: 0;
    padding: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 72px;
    justify-content: space-around;
    color: #fff;
    padding-top: 12px;
    padding-bottom: 12px;
    align-items: center;
    z-index: 1500;
`;

export const CenterTxt = styled.div`
    h2 {
        font-size: 1.5rem;
        margin: 0;
        padding: 0;
    }
    p {
        font-size: 0.95rem;
        margin: 0;
        padding: 0;
    }
`;

export const LinksBtn = styled.div``;

export const Button = styled.button`
    font-size: 1rem;
    padding: 0.5rem 1rem;
    color: ${(props) => props.color};
    border: ${(props) => (props.border ? props.border : "none")};
    background: ${(props) => props.bg};
    border-radius: 9999px;
    margin-right: 1rem;
    cursor: pointer;
    font-weight: 500;
    outline: none;
    &:hover {
        background: ${(props) => props.hover};
    }
`;
