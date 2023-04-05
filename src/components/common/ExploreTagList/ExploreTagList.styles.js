import styled from "styled-components";

export const Wrapper = styled.div`
    margin: 16px auto;
`;

export const TagWrapper = styled.div`
    width: 100%;
    padding: 8px 16px;
    &:hover {
        cursor: pointer;
        background: #f5f5f5;
    }
`;

export const Trending = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.fontLight};
    padding-bottom: 1px;
`;

export const HashtagText = styled.div`
    font-size: 16px;
    font-weight: 500;
`;

export const TagList = styled.div`
    margin-top: 4px;
`;
