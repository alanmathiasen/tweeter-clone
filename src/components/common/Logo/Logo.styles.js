import styled from "styled-components";

export const ImageLogo = styled.img`
    height: ${({ height }) => (height ? height : "1.5rem")};
    z-index: 10;
`;
