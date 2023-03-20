import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    list-style: none;
    justify-content: space-between;
    height: 100vh;
    position: sticky;
    top: 0;
    min-width: 275px;
    padding: 0 12px;
    ul {
        display: flex;
        flex-direction: column;
        padding: 0;
        a {
            display: flex;
            text-decoration: none;
            color: #000;
            font-size: 1.4rem;
            font-weight: 400;
            border-radius: 50px;
            padding: 6px 12px;
            margin: 6px 0;
            &:hover {
                background-color: #eee;
            }
        }
    }
`;

export const LogoImg = styled.span`
    a {
        background: none;
        border-radius: 50px;
        display: flex;
        width: 3rem;
        justify-content: center;
        align-items: center;
        height: 3rem;
        &:hover {
            background: #f7d4d4;
        }
    }
`;

export const ImageLogo = styled.img`
    height: 1.5rem;
    z-index: 10;
`;

export const ButtonTweet = styled.button`
    border: none;
    background-color: #00acee;
    color: #fff;
    border-radius: 50px;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 1rem 2rem;
    max-width: 250px;
    margin: 0.5rem 0;

    &:hover {
        background-color: #008abe;
    }
`;

export const Icon = styled.span`
    font-size: 1.6rem;
    margin-right: 1rem;
`;

export const UserCard = styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 50px;
    align-items: center;
    padding: 0.8rem;
    margin-bottom: 12px;
    justify-content: space-between;
    cursor: pointer;
    &:hover {
        background-color: #dedede;
    }
`;

export const CardContent = styled.div`
    display: flex;
    align-items: center;
`;

export const ImagenPerfil = styled.img`
    height: 40px;
    width: 40px;
    border-radius: 9999px;
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 4px;
    h3 {
        font-size: 15px;
        font-weight: 500;
        margin: 0;
        padding: 0;
        line-height: 20px;
    }
    p {
        color: #717a7a;
        font-size: 15px;
        margin: 0;
        padding: 0;
        line-height: 20px;
    }
`;

export const ModalWrapper = styled.div`
    display: flex;
    opacity: ${(props) => (props.modalState ? "1" : "0")};
    transition: all ease-in-out 2s;
    transition-delay: 1s;
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
    min-height: 80px;
    width: 280px;
    max-height: 260px;
    border-radius: 18px;
    position: absolute;
    bottom: 80px;
    right: 2px;
    box-shadow: rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px;
`;

export const UserCardOnModal = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    justify-content: space-between;
    span {
        color: ${(props) => props.theme.colors.main};
        font-size: 1.5rem;
    }
`;

export const CerrarSesion = styled.div`
    cursor: pointer;
    padding: 16px;
    font-size: 1rem;
`;
