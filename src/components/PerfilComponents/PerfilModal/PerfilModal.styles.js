import styled from "styled-components";

export const ModalWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 650px;
  background: #fff;
  border-radius: 16px;
  z-index: 100;
  position: absolute;
  top: 15%;
  left: 35%;
  align-content: center;
`;

export const ModalNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  h2 {
    margin-left: -14rem;
    font-size: 1.3rem;
  }
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

export const ButtonGuardar = styled.button`
  border: none;
  background-color: #000;
  color: #fff;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  padding: 6px 16px;
  max-width: 250px;
  margin-right: 1rem;
`;

export const FileForm = styled.form``;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export const Campo = styled.input`
  display: ${(props) => (props.display ? props.display : "flex")};
  margin-bottom: 1rem;
  border-radius: 5px;
  border: solid 1px #dedede;
  padding: 0.5rem;
  min-height: 50px;
  outline: none;
  &:focus {
    border: solid 2px #ee6262;
  }
`;

export const LabelIcon = styled.label``;
