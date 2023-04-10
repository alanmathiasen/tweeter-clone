import styled from "styled-components";

export const Overlay = styled.div`
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9990;
`;

export const Modal = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 150px;
    width: 600px;
    background-color: #fff;
    z-index: 50;
    border-radius: 18px;

    .tweet-info {
        width: 100%;
    }
    img {
        z-index: 1500;
    }
`;

export const CloseBtn = styled.button`
    position: absolute;
    display: flex;
    place-items: center;
    top: 5px;
    left: 5px;
    cursor: pointer;
    font-size: 1.6rem;
    border: none;
    background: none;
    border-radius: 50px;
    width: 2.2rem;
    height: 2.2rem;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: #dedede;
    }
    transition-duration: 0.3s;
`;
