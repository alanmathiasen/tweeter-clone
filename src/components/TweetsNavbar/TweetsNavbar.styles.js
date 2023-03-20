import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    width: 100%;
`;

export const ListContainer = styled.ul`
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    padding: 0;
    color: #717a7a;
    font-weight: 600;
    cursor: pointer;
    margin: 0.5rem auto;
`;

export const List = styled.li`
    width: 100%;
    text-align: center;
    color: ${(props) => (props.color ? props.color : "#717a7a")};
    &:hover {
        background-color: #dedede;
        /* color: #00acee; */
    }
`;

export const Line = styled.div`
    display: flex;
    margin: auto;
    border-bottom: 4px solid ${(props) => props.theme.colors.main};
    border-radius: 10px;
    width: 40%;
`;
