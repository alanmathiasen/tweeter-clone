import styled from "styled-components";

export const AppWrapper = styled.div`
    display: flex;
    margin: 0 auto;
    max-width: 1240px;    
    }
`;

export const ContentWrapper = styled.div`
    display: flex;
    width: 100%;
`;

export const OverlayModal = styled.div`
    display: ${(props) => (props.tweettModal ? "block" : "none")};
    background-color: rgba(0, 0, 0, 0.4);
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    left: 0;
    position: absolute;
    z-index: 1500;
`;

export const RouteWrapper = styled.div`
    min-width: 600px;
    flex-grow: 1;
`;
