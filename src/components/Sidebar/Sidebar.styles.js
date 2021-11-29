import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  list-style: none;
  ul {
    display: flex;
    flex-direction: column;
    a {
      display: flex;
      text-decoration: none;
      color: #000;
      font-size: 1.4rem;
      font-weight: 400;
      margin: 0.5rem 0;
      border-radius: 50px;
      padding: 0.5rem;

      &:hover {
        background-color: #eee;
      }
    }
  }
`;

export const ButtonTweet = styled.button`
  border: none;
  background-color: #00acee;
  color: #fff;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 1rem 2rem;
  max-width: 250px;
  margin: 0.5rem 0;

  &:hover {
    background-color: #008abe;
  }
`;

export const Icon = styled.span`
  font-size: 1.6rem;
  margin-right: 1rem;
`;
