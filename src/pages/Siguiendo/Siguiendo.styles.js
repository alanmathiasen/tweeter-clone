import styled from "styled-components";

export const SectionWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: solid 1px #eee;
  a {
    text-decoration: none;
    color: #000;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transition: 0.3s all ease-in-out;

    &:hover {
      transition: 0.3s all ease-in-out;
      background-color: #dedede;
    }
  }
`;

export const LinkText = styled.p`
  color: #000;
  font-weight: 600;
`;

export const SecondaryText = styled.p`
  color: #737373;
  font-weight: 500;
`;

export const Line = styled.div`
  display: flex;
  border-bottom: 4px solid #00acee;
  border-radius: 10px;
  width: 28%;
`;

export const ArticleWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
`;

export const NoContentWrpapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;

  align-items: flex-start;

  h2 {
    font-size: 2.3rem;
    margin-bottom: -0.5rem;
  }
  p {
    color: #737373;
    font-size: 1.05rem;
    max-width: 400px;
  }
`;

export const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px red;
`;
