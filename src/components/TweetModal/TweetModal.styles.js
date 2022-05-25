import styled from "styled-components";

export const ModalWrapper = styled.div`
  display: ${(props) => (props.tweetModal ? "flex" : "none")};
  flex-direction: column;
  max-height: 1500px;
  /* height: 300px; */
  width: 600px;
  background-color: #fff;
  z-index: 100;
  position: absolute;
  left: 34%;
  top: 5%;
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
