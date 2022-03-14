import styled from "styled-components";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

export const FormContent = styled.form`
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0;
  align-items: center;
`;

export const Campo = styled.input`
  margin-bottom: 1rem;
  border-radius: 5px;
  border: solid 1px #dedede;
  padding: 0.5rem;
  min-height: 50px;
  outline: none;
  width: 100%;
  &:focus {
    border: solid 2px #ee6262;
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ChangeWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  align-items: flex-end;
  p {
    margin: 0;
    padding: 0;
    font-size: 16px;
  }
  button {
    background: none;
    border: none;
    font-size: 16px;
    margin: 0;
    padding: 0;
    margin-left: 0.4rem;
    color: #ee6262;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ImageLogo = styled.img`
  height: 1.5rem;
`;

export const ButtonGoogle = styled.button`
  background: none;
  border: solid 1px #dedede;
  border-radius: 50px;
  width: 80%;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  margin-top: 0.8rem;
  cursor: pointer;
  img {
    height: 1.5rem;
    margin-right: 0.5rem;
  }
`;
