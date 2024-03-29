import styled from "styled-components";

export const CustomButton = styled.button`
    border: none;
    background-color: ${(props) => props.theme.colors.main};
    color: #fff;
    border-radius: 50px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 1rem 2rem;
    max-width: 250px;
    margin: 0.5rem 0;

    &:hover {
        background-color: #bf5252;
    }
    &:disabled {
        background-color: gray;
        cursor: default;
    }
`;
