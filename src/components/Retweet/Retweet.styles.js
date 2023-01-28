import styled from "styled-components";
import { tweetGrid } from "../../styles/mixins";
export const Wrapper = styled.div`
    ${tweetGrid}
    padding: 0px 16px;

    &:hover {
        background-color: #f3f3f3;
    }
    color: #3f3f3f;
`;
export const RetweetIcon = styled.div`
    font-size: 17px;
    justify-self: end;
    grid-column: 1/1;
    grid-row: 1;
`;
export const Text = styled.div`
    font-size: 12px;
    font-weight: 500;
    grid-row: 1;
    grid-column: 2/4;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;
