import styled from "styled-components";

export const ImageLogo = styled.img`
    height: ${({ height }) => (height ? height : "24px")};
    z-index: 10;
`;
