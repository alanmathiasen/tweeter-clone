import styled from "styled-components";

export const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 0px;
  margin: 0 16rem;
  @media (max-width: 1400px) {
    margin: 0 3rem;
  }
`;

export const RoutesWrapper = styled.div`
  border: solid lightgray;
  border-width: 0px 1px;
`;

export const OverlayModal = styled.div`
  display: ${(props) => (props.tweettModal ? "flex" : "none")};
  background-color: rgba(0, 0, 0, 0.4);
  height: 100%;
  width: 100%;
  left: 0;
  position: absolute;
`;
