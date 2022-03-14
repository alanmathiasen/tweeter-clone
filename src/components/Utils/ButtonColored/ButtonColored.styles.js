import styled from "styled-components";

export const CustomButton = styled.button`
  border: none;
  background-color: #ee6262;
  color: #fff;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1rem 2rem;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "250px")};
  margin: 0.5rem 0;
  width: 100%;
  &:hover {
    background-color: #bf5252;
  }
`;
