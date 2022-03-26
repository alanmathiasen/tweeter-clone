import styled from "styled-components";

export const Wrapper = styled.div`
    border: 1px solid lightgray;
    border-radius: 10px;
    max-width: 100%;
    margin: 12px 0 6px 0;
    min-width: 300px;
    padding: 14px;
    &:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.05);
    }
    grid-column: span 2;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 0px;
    > div,
    span {
        margin-right: 5px;
    }
    span {
        color: #717a7a;
    }
`;

export const ImgPerfil = styled.div`
    max-width: 20px;
    width: 20px;
    height: 20px;
    img {
        max-width: 100%;
        border-radius: 50%;
    }
`;

export const Username = styled.div`
    color: #292b2b !important;
    font-weight: 600;
`;

export const TweetContent = styled.div`
    p {
        margin: 0;
    }
`;
