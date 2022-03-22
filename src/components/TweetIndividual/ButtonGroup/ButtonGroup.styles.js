import styled from "styled-components";

export const Wrapper = styled.div`
    grid-column: 2 / -1;

    grid-row-start: 100;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    padding-top: 15px;
    align-items: center;
    > div {
        display: flex;
        align-items: center;
        width: 25%;

        span {
            font-size: 15px;
            margin-left: 12px;
        }
    }

    a {
        color: black;
        cursor: pointer;
    }

    .commentBtn,
    .likeBtn,
    .retweetBtn,
    .shareBtn {
        overflow: visible;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        padding: 5px;
        transition: 0.3s;
        &:hover {
        }
    }
    .comment,
    .like,
    .retweet {
        display: flex;
        align-items: center;
        transition: 0.3s;
        &:hover {
            color: blue;
            .commentBtn,
            .shareBtn {
                background-color: #9f9fff;
            }
        }
    }
    .like {
        &:hover {
            color: red;
            .likeBtn {
                background-color: #ff9f9f;
            }
        }
    }
    .liked {
        color: red;
    }
    .retweeted {
        color: #33b833;
    }

    .retweet {
        &:hover {
            color: green;
            .retweetBtn {
                background-color: #a2ff9f;
            }
        }
    }
`;

export const MainWrapper = styled.div`
    margin: 16px 0;
`;

export const Stats = styled.div`
    border-top: 1px solid lightgray;
    font-size: 18px;
    padding: 11px 0;
    span {
        margin-right: 10px;
    }
`;

export const Buttons = styled.div`
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    display: flex;
    justify-content: space-around;
    padding: 5px;
    a {
        color: black;
        cursor: pointer;
    }

    .commentBtn,
    .likeBtn,
    .retweetBtn,
    .shareBtn {
        overflow: visible;
        width: 33px;
        height: 33px;
        border-radius: 50%;
        padding: 5px;
        transition: 0.3s;
        &:hover {
        }
    }
    .comment,
    .like,
    .retweet {
        display: flex;
        align-items: center;
        transition: 0.3s;
        &:hover {
            color: blue;
            .commentBtn,
            .shareBtn {
                background-color: #9f9fff;
            }
        }
    }
    .like {
        &:hover {
            color: red;
            .likeBtn {
                background-color: #ff9f9f;
            }
        }
    }
    .liked {
        color: red;
    }
    .retweeted {
        color: green;
    }

    .retweet {
        &:hover {
            color: green;
            .retweetBtn {
                background-color: #a2ff9f;
            }
        }
    }
`;
