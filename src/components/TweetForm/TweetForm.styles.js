import styled from "styled-components";

export const TweetFormWrapper = styled.form`
  display: flex;
  padding: 16px 14px;
  width: 100%;
  position: relative;
  margin: 0;
`;

export const ButtonTwittear = styled.button`
  border: none;
`;

export const ImagenPerfil = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 9999px;
`;

export const InputWrapper = styled.div`
  width: 100%;
  margin: 0 0.5rem;
  button {
    display: flex;
    float: right;
    padding: 0.5rem 1.5rem;
  }
`;

export const TweetInput = styled.input`
  width: 100%;
  border: none;
  padding: 1rem;
  outline: none;
  font-size: 1.2rem;
  ::placeholder {
    font-size: 1.5rem;
  }
`;

export const LabelFile = styled.label`
  cursor: pointer;
  color: #ee6262;
  margin-left: 1rem;
  font-size: 1.8rem;
  border-radius: 50px;
  span {
    &:hover {
      background-color: #f7d4d4;
    }
  }
`;

export const InputFile = styled.input`
  display: none;
`;

export const ImagenFile = styled.img`
  border-radius: 8px;
  max-width: 500px;
`;
