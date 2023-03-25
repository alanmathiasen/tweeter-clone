import styled from "styled-components";

export const Popover = styled.div`
    border: 1px solid #ccc;
    border-radius: 14px;
    background: #fff;
    box-shadow: rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px;
`;

export const Name = styled.span``;

export const Wrapper = styled.div`
    display: inline-block;
`;

export const PopoverImg = styled.div`
    margin: 0;
    padding: 0;
    img {
        height: 64px;
        width: 64px;
        border-radius: 9999px;
    }
    &:hover {
        opacity: 0.8;
    }
`;

export const PopoverWrapper = styled.div`
    width: 300px;
    padding: 15px;
`;

export const LoaderWrapper = styled.div`
    display: flex;
    margin: 0 auto;
    justify-content: center;
`;

export const PopoverHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const PopoverBody = styled.div``;

export const UserFollowData = styled.p`
    display: flex;
    gap: 20px;
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    span {
        font-size: 14px;
        font-weight: normal;
        color: ${(props) => props.theme.colors.fontLight};
    }
`;

export const Following = styled.div`
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;
export const Followers = styled.div`
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;
export const Username = styled.div`
    font-size: 16px;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

export const Route = styled.div`
    font-size: 14px;
    color: ${(props) => props.theme.colors.fontLight};
    &:hover {
        cursor: pointer;
    }
`;
