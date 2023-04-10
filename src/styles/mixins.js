import { css } from "styled-components";

export const tweetGrid = css`
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-gap: 0px 10px;
`;

export const profileImgAndContent = css`
    width: 100%;
    display: grid;
    grid-template-columns: auto 8fr;
    gap: 10px;
`;

export const boxRounded = css`
    border-radius: 10px;
`;

export const greyBackgroundWithHover = css`
    background: #f7f9f9;
    cursor: pointer;
    &:hover {
        background: #eff1f1;
    }
`;
