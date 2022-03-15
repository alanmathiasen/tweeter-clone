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
    z-index: 1450;
`;

export const Modal = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 200px;
    width: 600px;
    background-color: #fff;
    z-index: 100;
    border-radius: 18px;
    padding: 70px 16px 40px 16px;

    .tweet-info {
        width: 100%;
    }
    img {
        z-index: 1500;
    }
`;

export const CloseBtn = styled.button`
    //display: flex;
    position: absolute;
    top: 20px;
    left: 20px;
    cursor: pointer;
    font-size: 1.6rem;
    border: none;
    background: none;
    border-radius: 50px;
    width: 2.6rem;
    height: 2.6rem;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: #dedede;
    }
`;
