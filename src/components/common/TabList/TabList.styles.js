import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

export const ListContainer = styled.ul`
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    font-size: 16px;
    padding: 0;
    color: #717a7a;
    cursor: pointer;
    margin: auto;
`;

export const ListItem = styled.li`
    width: 100%;
    text-align: center;
    font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
    color: ${(props) => (props.color ? props.color : "#717a7a")};
    &:hover {
        background-color: #dedede;
        /* color: #00acee; */
    }
    transition: 0.3s;
`;

export const Line = styled.div`
    display: flex;
    margin: auto;
    border-bottom: 4px solid ${(props) => props.theme.colors.main};
    border-radius: 10px;
    width: 40%;
`;
