import styled, { css } from "styled-components";
import { boxRounded, titleStyle } from "../../styles/mixins";
import { RoundedButton } from "../common/buttons.styles";

const sticky = css`
    position: fixed;
    bottom: 10px;
    z-index: 999;
    animation: 500ms ease-in-out 0s normal none 1 running fadeInDown;
`;

export const Wrapper = styled.div`
    width: 350px;
    min-width: 350px;
    height: 100vh;
    margin: 0 12px 32px 24px;
    ${({ isSticky }) => isSticky && sticky}
`;

export const AuthWrapper = styled.div`
    padding: 12px 16px 16px 16px;
    ${boxRounded};
    border: 1px solid #ededed;
    div {
        font-size: 12px;
        color: darkgray;
        line-height: 16px;
    }
`;

export const Title = styled.h2`
    font-size: 20px;
    padding-bottom: 12px;
    margin: 0;
`;

export const ButtonGroup = styled.div`
    padding-top: 16px;
    margin: 0;
`;

export const RegisterForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 0 auto;
    margin-bottom: 30px;
`;

export const ButtonRegister = styled(RoundedButton)`
    width: 100%;
    margin-bottom: 12px;
    padding: 10px 0;
    font-size: 16px;
    color: #444;
    &:hover {
        background-color: rgba(238, 98, 98, 0.1);
        border-color: rgba(238, 98, 98, 0.6);
    }
`;

export const RegisterFormTitle = styled.h3`
    color: #000;
    font-size: 31px;
    font-weight: 600;
`;

export const ModalAuthWrapper = styled.div`
    width: 300px;
    margin: 0 auto;
    padding-bottom: 30px;
`;

export const LogoWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 15px;
`;

export const ModalTitle = styled.h3`
    font-size: 24px;
    margin: 30px 0;
`;

export const GoToLogin = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.lightFont};

    & span {
        color: ${({ theme }) => theme.colors.main};
        cursor: pointer;
    }
`;

export const FixedWrapper = styled.div`
    position: fixed;
    width: inherit;
    padding: 16px 0 4px 0;
    background: #fff;
    z-index: 9999;
`;

export const AuthMenuWrapper = styled.div``;

export const TrendingWrapper = styled.div`
    ${boxRounded};
    h2 {
        ${titleStyle};
        padding: 8px 16px;
    }
    margin: ${({ isSearchBar }) => (isSearchBar ? "0 0 16px" : "16px 0")};
    background: ${({ theme }) => theme.colors.grey};
`;
