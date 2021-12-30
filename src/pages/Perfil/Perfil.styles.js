import styled from "styled-components";

export const PerfilWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
  grid-column-start: 2;
  grid-column-end: 4;
`;

export const PerfilNav = styled.div`
  display: flex;
`;

export const NavInfo = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    margin-bottom: 0rem;
    margin-top: 0.5rem;
  }
  p {
    font-size: 1rem;
    margin: 0;
    color: #717a7a;
  }
`;

export const ButtonBack = styled.button`
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  font-size: 1.5em;
  cursor: pointer;
  max-height: 50px;
  display: flex;
  border-radius: 50px;
  width: 50px;
  align-items: center;
  margin-left: 0.5rem;
  margin-right: 2rem;
  justify-content: center;

  &:hover {
    background: #eee;
  }
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

export const EditarPerfil = styled.button`
  display: flex;
  float: right;
  background: none;
  border: solid 1px #717a7a;
  border-radius: 50px;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin: 1rem;
  font-weight: 600;
  color: ${(props) => (props.itsCurrentUserProfile ? "#000" : "#fff")};
  background-color: ${(props) =>
    props.itsCurrentUserProfile ? "#fff" : "#000"};
  cursor: pointer;
`;

export const InfoPerfil = styled.div`
  margin-left: 1rem;

  h2 {
    margin: 0;
  }
  span {
    color: #717a7a;
  }
  p {
    font-size: 0.9rem;
  }
`;

export const SeguidoresYSeguidosWrapper = styled.div`
  display: flex;
`;

export const SeguidoresYSeguidos = styled.p`
  color: #717a7a;
  margin-right: 1rem;
  span {
    color: #000;
    font-weight: 700;
  }
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
