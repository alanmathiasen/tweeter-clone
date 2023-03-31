import styled from "styled-components";

export const SeparatorWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0;
`;

export const Line = styled.div`
    width: 50%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.fontLight};
`;

export const Text = styled.div`
    padding: 0 15px;
`;
