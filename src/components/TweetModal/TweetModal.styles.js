import styled from "styled-components";

export const ModalWrapper = styled.div`
    //display: ${(props) => (props.tweetModal ? "flex" : "none")};
    display: flex;
    flex-direction: column;
    height: 300px;
    width: 500px;
    background-color: #fff;
    z-index: 2000;
    position: absolute;
    left: 34%;
    top: 50px;

    border-radius: 18px;
    padding: 0.5rem;
`;

export const CloseBtn = styled.button`
    display: flex;
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

export const TweetFormWrapper = styled.div`
    button {
        margin-top: 6rem;
    }
`;
