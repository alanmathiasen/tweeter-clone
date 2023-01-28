import styled from "styled-components";

export const PerfilNavbar = styled.div`
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
    background: #dedede;
  }
`;
