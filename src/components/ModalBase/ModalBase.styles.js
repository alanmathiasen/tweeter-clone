import styled from "styled-components";


export const Overlay = styled.div`
    position: fixed;
    background: rgba(0,0,0,.5);
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

`;

export const Modal = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 300px;
    width: 600px;
    background-color: #fff;
    z-index: 100;
    border-radius: 18px;
    padding: 0.5rem;
`;