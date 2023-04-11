import styled from "styled-components";

export const SearchWrapper = styled.div`
    display: flex;
    place-items: center;
    gap: 10px;
    padding: 7px;
    padding-left: 8px;
    margin: 0 auto;
    border-radius: 9999px;
    border: 2px solid ${({ isFocused, theme }) => (isFocused ? theme.colors.main : "transparent")};
    background-color: ${({ isFocused, theme }) => (isFocused ? "#fff" : theme.colors.darkGrey)};
    font-size: 1.4rem;
    width: 100%;
    color: ${({ isFocused, theme }) => (isFocused ? theme.colors.main : "#555")};
`;

export const Input = styled.input`
    width: 100%;
    border: none;
    background: transparent;
    padding: 5px;
    font-size: 14px;
    &:focus {
        outline: none;
    }
`;
