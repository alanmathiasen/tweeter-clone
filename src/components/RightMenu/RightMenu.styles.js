import styled from "styled-components";
import { ButtonOutline } from "../common/buttons.styles";

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

export const ButtonGroup = styled.div`
    padding-top: 16px;
    margin: 0;
`;

export const RegisterForm = styled.form`
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
`;

export const ButtonRegister = styled(ButtonOutline)`
    padding: 20px 0;
    margin: 0 auto;
`;

export const RegisterFormTitle = styled.h3`
    color: #000;
    font-size: 31px;
    font-weight: 600;
`;
