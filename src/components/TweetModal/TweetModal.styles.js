import styled from "styled-components";

export const ModalWrapper = styled.div`
  display: ${(props) => (props.tweettModal ? "flex" : "none")};
  height: 300px;
  width: 600px;
  background-color: #fff;
  z-index: 100;
  position: absolute;
  left: 34%;
  top: 5%;
  border-radius: 18px;
  padding: 1rem;
`;
