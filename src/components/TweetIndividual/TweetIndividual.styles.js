import styled from "styled-components";

export const TweetContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr;
  grid-gap: 5px;
  border-bottom: 1px solid lightgrey;
  padding: 20px;
`;

export const ImgPerfil = styled.div`
  margin: 0 auto;
  grid-row: 1 / span 5;
  img {
    height: 48px;
    width: 48px;
    border-radius: 9999px;
  }
`;

export const TweetNav = styled.div`
  display: flex;
  font-size: 1rem;

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
  display: flex;
  flex-direction: column;
  font-size: 15px;
`;
export const Username = styled.span`
  color: #292b2b !important;
`;

export const TweetImg = styled.img`
  max-width: 60%;
  max-height: 60%;
  border-radius: 20px;
`;
