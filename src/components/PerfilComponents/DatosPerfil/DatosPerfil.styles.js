import styled from "styled-components";

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

  color: ${(props) =>
    props.itsCurrentUserProfile || props.handleFollowButton ? "#000" : "#fff"};
  background-color: ${(props) =>
    props.itsCurrentUserProfile || props.handleFollowButton ? "#fff" : "#000"};
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

export const AllLinksWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  p,
  a {
    margin-left: 0.5rem;
    margin-right: 3rem;
  }
  a {
    text-decoration: none;
    color: #00acee;
  }
`;

export const InfoIcon = styled.div``;

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
  a {
    text-decoration: none;
  }
`;
