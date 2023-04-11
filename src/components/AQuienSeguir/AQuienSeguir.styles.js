import styled from "styled-components";
import { boxRounded, greyBackgroundWithHover, profileImgAndContent, titleStyle } from "../../styles/mixins";

export const ArticleWrapper = styled.article`
    //margin-top: 3rem;
    ${boxRounded}
    ${titleStyle}
    background: ${({ theme }) => theme.colors.grey};
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
    padding: 11px 16px;
    font-size: 14px;

    ${greyBackgroundWithHover}

    h3 {
        font-size: 14px;
        font-weight: 500;
        margin: 0;
        padding: 0;
        &:hover {
            text-decoration: underline;
        }
    }
    p {
        margin: 0;
        padding: 0;
        color: #737373;
    }
`;

export const CardContent = styled.div`
    display: flex;
    ${profileImgAndContent}
`;

export const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ImagePerfil = styled.img`
    height: 48px;
    width: 48px;
    border-radius: 9999px;
`;

export const InfoUser = styled.div`
    // margin-left: 0.6rem;
    p {
        font-weight: 400;
    }
`;

export const ShowMore = styled.button`
    background: none;
    border: none;
    color: ${(props) => props.theme.colors.main};
    font-size: 16px;
    width: 100%;
    margin: 0;
    display: flex;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
    cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => theme.colors.darkGrey};
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
