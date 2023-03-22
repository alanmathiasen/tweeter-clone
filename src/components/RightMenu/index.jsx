import React from "react";
import { BuscarWrapper, Buscar, Wrapper } from "./RightMenu.styles";
import { RiSearchLine } from "react-icons/ri";
import AQuienSeguir from "../AQuienSeguir";
import { useGlobalContext } from "../../context/GlobalContext";
import AuthMenu from "./AuthMenu";

const RightMenu = () => {
    const { userData } = useGlobalContext();
    return (
        <Wrapper>
            {userData ? (
                <>
                    <BuscarWrapper>
                        <Buscar placeholder="Buscar en tweeter" />
                    </BuscarWrapper>
                    {userData && <AQuienSeguir />}
                </>
            ) : (
                <AuthMenu />
            )}
        </Wrapper>
    );
};

export default RightMenu;
