import styled from "styled-components";

export const TweetContainer = styled.div`
  display: grid;
  grid-template-columns: 60px 5fr 100px;
  border-bottom: 1px solid lightgrey;
  padding: 8px 16px;
  cursor: pointer;
  a {
    text-decoration: none;
  }
  p {
    margin: 0;
  }
  font-size: 15px;
  transition: 0.2s;
  &:hover {
    background-color: #f3f3f3;
  }
  form {
    grid-column: 2/3;
    margin-top: 10px;
  }
`;

export const ImgPerfil = styled.div`
  margin: 0;
  grid-row: 1 / span 5;
  img {
    height: 48px;
    width: 48px;
    border-radius: 9999px;
  }
  &:hover {
    opacity: 0.8;
  }
`;

export const BorrarTweet = styled.div`
  grid-column: 3;
  grid-row: 1 / 1;
  justify-self: end;
  align-self: center;
`;

export const TweetNav = styled.div`
  display: flex;
  align-items: center;
  h4 {
    margin: 0;
    padding-right: 4px;
  }
  span {
    padding-right: 4px;
    color: #717a7a;
  }
  a {
    text-decoration: none;
    color: #717a7a;
  }
`;

export const TweetContent = styled.div`
  padding-top: 5px;
  grid-column: 2/4;
`;
export const Username = styled.span`
  color: #292b2b !important;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  font-weight: 600;
`;

export const TweetImg = styled.img`
  max-width: 60%;
  max-height: 60%;
  border-radius: 20px;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  font-size: 15px;
`;

export const TweetHeader = styled.div`
  display: grid;
  grid-template-columns: 60px 5fr 100px;
`;

export const MainUser = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
`;

export const TweetMainContent = styled.div`
  display: flex;
  flex-direction: column;
  p {
    font-size: 20px;
    margin: 12px 0;
  }
`;
