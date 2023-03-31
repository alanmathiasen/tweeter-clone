import styled from "styled-components";

export const RoundedButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 40px;
    border: 1px solid #999;
    background-color: #fff;
    cursor: pointer;
`;

export const ButtonRegister = styled(RoundedButton)`
    width: 100%;
    margin-bottom: 12px;
    padding: 10px 0;
    font-size: 16px;
    color: #444;
    &:hover {
        background-color: rgba(238, 98, 98, 0.1);
        border-color: rgba(238, 98, 98, 0.6);
    }
`;
