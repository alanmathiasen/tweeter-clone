import styled from "styled-components";

export const BuscarWrapper = styled.div`
    display: flex;
    margin-top: 0.5rem;
`;

export const Buscar = styled.input`
    border-radius: 9999px;
    border: none;
    background-color: #ededed;
    font-size: 1rem;
    padding: 1rem;
    width: 100%;
`;

export const Wrapper = styled.div`
    flex-grow: 1;
    overflow: hidden;
    padding: 12px 12px 64px 24px;
`;

export const AuthWrapper = styled.div`
    padding: 12px 16px 16px 16px;
    border: 1px solid lightgray;
    border-radius: 10px;
    display: block;
    div {
        font-size: 12px;
        color: darkgray;
        line-height: 16px;
        m
    }
`;

export const Title = styled.h2`
    font-size: 20px;
    padding-bottom: 12px;
    margin: 0;
`;

export const SignUpButton = styled.button`
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

export const Buttons = styled.div`
    padding-top: 16px;
    margin: 0;
`;
