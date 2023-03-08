import styled from "styled-components";

export const ButtonOutline = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin: 0 auto;
    width: 100%;
    border-radius: 40px;
    border: 1px solid #999;
    background-color: #fff;
    font-size: 16px;
    font-color: #444;
    padding: 10px 0;
    margin-bottom: 12px;
    cursor: pointer;
    &:hover {
        background-color: rgba(238, 98, 98, 0.1);
        border-color: rgba(238, 98, 98, 0.6);
    }
`;
