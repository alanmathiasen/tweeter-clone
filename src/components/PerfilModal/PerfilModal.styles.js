import styled from "styled-components";

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 650px;
  /* max-height:90vh; */
  /* min-height: 400px; */
  background: #eee;
  border-radius: 16px;
  z-index: 100;
  position: absolute;
  top: 15%;
  left: 35%;
  /* transform: translateX(30%) translateY(-80%); */
  align-content: center;
`;

export const ModalNav = styled.div`
  display: flex;
`;
