import styled from "styled-components";

export const PerfilWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
  grid-column-start: 2;
  grid-column-end: 2;
`;

export const PerfilContainer = styled.div``;

export const PortadaContainer = styled.div`
  width: 100%;
  max-height: 200px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

export const Portada = styled.img`
  max-width: 100%;
`;

export const ImgPerfil = styled.img`
  height: 150px;
  width: 150px;
  margin-left: 1rem;
  border-radius: 79px;
  border: solid 4px #fff;
  margin-top: -5rem;
`;

export const PerfilModalContainer = styled.div`
  display: ${(props) => (props.perfilModalOpen ? "flex" : "none")};
`;

export const OverlayModal = styled.div`
  display: ${(props) => (props.perfilModalOpen ? "felx" : "none")};
  background-color: rgba(0, 0, 0, 0.4);
  height: 100%;
  width: 100%;
  left: 0;
  position: absolute;
`;
