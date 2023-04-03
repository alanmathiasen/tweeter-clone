import styled from "styled-components";

export const HomeWrapper = styled.div`
    font-size: 2.2rem;
    color: #000;

    padding: 10px 0;
`;

export const TweetFormWrapper = styled.div`
    padding: 0 16px;
    border-bottom: 1px solid #ededed;
`;

export const NewTweets = styled.div`
    border-bottom: 1px solid #ededed;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 15px;
    transition: 0.2s;
    &:hover {
        background-color: #f3f3f3;
    }
    text-align: center;
`;
