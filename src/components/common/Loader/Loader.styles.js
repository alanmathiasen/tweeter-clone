import styled, { keyframes } from "styled-components";

const animate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
export const LoaderWrapper = styled.div`
  width: 32px;
  height: 32px;
  border: 4px solid ${(props) => props.theme.colors.main};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${animate} 1s linear infinite;
  }
`;
