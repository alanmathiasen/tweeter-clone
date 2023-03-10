import styled from "styled-components";

export const Up = styled.div`
    position: absolute;
    top: 0;
    left: ${(props) => (props.left ? props.left : "39px")};
    width: 2px;
    background-color: #afafaf;
    height: 20%;
    z-index: 500;
`;

export const Down = styled.div`
    position: absolute;
    bottom: 0;
    left: ${(props) => (props.left ? props.left : "39px")};
    width: 2px;
    background-color: #afafaf;
    height: 80%;
    z-index: 500;
`;
