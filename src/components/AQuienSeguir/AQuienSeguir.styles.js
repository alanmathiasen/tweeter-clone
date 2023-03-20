import styled from "styled-components";

export const ArticleWrapper = styled.article`
    margin-top: 3rem;
`;

export const Tittle = styled.h2`
    font-size: 1.4rem;
    font-weight: 800;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    margin-bottom: 0;
`;

export const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Card = styled.div`
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    align-items: center;
    padding: 0.5rem 1rem;

    &:hover {
        background-color: #eee;
    }

    h3 {
        font-size: 1.08rem;
        margin: 0;
        padding: 0;
        &:hover {
            text-decoration: underline;
        }
    }
    p {
        font-size: 1rem;
        margin: 0;
        padding: 0;
        color: #737373;
    }
    span {
        font-size: 1rem;
        margin: 0;
        padding: 0;
    }
`;

export const CardContent = styled.div`
    display: flex;
`;

export const ImagePerfil = styled.img`
    height: 48px;
    width: 48px;
    border-radius: 9999px;
`;

export const InfoUser = styled.div`
    margin-left: 0.6rem;
`;

export const MostrarMas = styled.button`
    background: none;
    border: none;
    color: ${(props) => props.theme.colors.main};
    font-size: 1rem;
    margin: 0;
    display: flex;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
    cursor: pointer;
    &:hover {
        background-color: #eee;
    }
    p {
        padding-left: 1rem;
    }
`;

export const ButtonMargin = styled.div`
    button {
        margin-right: 0;
    }
`;
