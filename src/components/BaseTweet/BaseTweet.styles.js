import styled from "styled-components";
export const Wrapper = styled.div`
    display: grid;
    width: 100%;
    position: relative;
    grid-template-columns: 1fr 8fr;
`;
export const TweetContent = styled.div`
    padding-top: 5px;
    grid-column: 2/4;
    p {
        margin: 0;
    }
`;
export const ImgPerfil = styled.div`
    margin: 0;
    grid-row: 1 / span 5;
    position: relative;
    z-index: 1500;
    img {
        height: 48px;
        width: 48px;
        border-radius: 9999px;
    }
`;

export const TweetNav = styled.div`
    display: flex;
    align-items: center;
    h4 {
        margin: 0;
        padding-right: 4px;
    }
    span {
        padding-right: 4px;
        color: #717a7a;
    }
    a {
        text-decoration: none;
        color: #717a7a;
    }
`;

export const Username = styled.span`
    color: #292b2b !important;
    cursor: pointer;

    font-weight: 600;
`;
