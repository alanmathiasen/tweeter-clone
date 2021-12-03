import styled from "styled-components";

export const TweetWrapper = styled.div`
  display: flex;
  padding: 0 1rem;
  cursor: pointer;
`;

export const ImgPerfil = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 9999px;
  margin-right: 12px;
`;

export const TweetContainer = styled.div`
  display: flex;
  flex-direction: column;
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

export const TweetImagen = styled.img`
  border-radius: 20px;
`;
