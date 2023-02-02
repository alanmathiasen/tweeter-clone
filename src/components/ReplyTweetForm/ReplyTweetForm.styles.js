import styled from "styled-components";

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
