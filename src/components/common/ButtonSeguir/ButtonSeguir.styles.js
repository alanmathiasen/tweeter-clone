import styled from "styled-components";

export const BtnSeguir = styled.button`
  display: flex;
  float: right;
  background: none;
  border: solid 1px #e1e8ed;
  border-radius: 50px;
  font-size: 1rem;
  padding: 0.5rem 1.2rem;
  margin: 1rem;
  font-weight: 600;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "100px")};
  cursor: pointer;
  max-height: 40px;
  line-height: 1.2;
  color: ${(props) =>
    props.itsCurrentUserProfile || props.color ? props.color : "#fff"};
  background-color: ${(props) =>
    props.itsCurrentUserProfile || props.bg ? props.bg : "#000"};

  cursor: pointer;
  &:hover span {
    display: none;
  }
  &:hover:before {
    content: "${(props) => props.contentTxt}";
    display: absolute;
  }

  &:hover {
    color: ${(props) =>
      props.hoverColor ? props.hoverColor : props.btnState ? "red" : "#fff"};
    background-color: ${(props) =>
      props.hoverBgColor
        ? props.hoverBgColor
        : props.btnState
        ? "#ff9f9f"
        : "#23292E"};
  }
`;
