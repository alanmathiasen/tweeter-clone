import styled from "styled-components";

export const FollowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
  grid-column-start: 2;
  grid-column-end: 2;
`;

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
  align-items: flex-start;
`;

export const NoContentWrpapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  align-items: flex-start;
  max-width: 400px;
  margin: auto;

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
  flex-direction: row;
  cursor: pointer;
  justify-content: space-between;
  width: 100%;

  &:hover {
    background-color: #eee;
  }
  a {
    text-decoration: none;
    color: #000;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    left: 1.5rem;
    width: 100%;
  }
`;

export const UserCardContent = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 1.2rem;
    margin: 0.5rem 0 0 0;
  }
  span {
    color: #737373;
    font-size: 1rem;
  }
  p {
    font-size: 1rem;
    margin: 0.7rem 0;
  }
`;

export const SiguiendoBtn = styled.button`
  position: relative;
  top: 1.5rem;
  right: 3rem;
  cursor: pointer;
  border: solid 1px #737373;
  border-radius: 50px;
  background: none;
  width: 130px;
  height: 30px;
  font-weight: 600;
  z-index: 10;
  &:hover span {
    display: none;
  }
  &:hover::before {
    content: "Dejar de seguir";
  }
  &:hover {
    border-color: red;
  }
`;
