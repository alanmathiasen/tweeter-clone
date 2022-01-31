import styled from "styled-components";

export const Wrapper = styled.div`
  grid-column: 2 / span 2;
  grid-row: 3;
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

  .retweet {
    &:hover {
      color: green;
      .retweetBtn {
        background-color: #a2ff9f;
      }
    }
  }
`;
