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
`;

export const List = styled.li`
  &:hover {
    color: #00acee;
  }
`;
