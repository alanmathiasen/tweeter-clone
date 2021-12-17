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
  h2 {
    margin-left: -14rem;
    font-size: 1.5rem;
  }
`;

export const CloseBtn = styled.button`
  display: flex;
  cursor: pointer;
  margin-left: 1rem;
  font-size: 1.8rem;
  border: none;
  background: none;
`;

export const ButtonGuardar = styled.button`
  border: none;
  background-color: #000;
  color: #fff;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  padding: 10px 20px;
  max-width: 250px;
  margin-right: 1rem;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export const Campo = styled.input`
  margin-bottom: 1rem;
  border-radius: 5px;
  border: solid 1px #000;
  padding: 0.5rem;
  min-height: 50px;
  outline: none;

  &:focus {
    border: solid 2px #00acee;
  }
`;
