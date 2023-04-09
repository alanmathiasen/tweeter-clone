import React from "react";
import { Wrapper, StickyWrapper, FixedWrapper, AuthMenuWrapper } from "./RightMenu.styles";
import AQuienSeguir from "../AQuienSeguir";
import { useGlobalContext } from "../../context/GlobalContext";
import AuthMenu from "./AuthMenu";
import SearchInput from "../common/SearchInput";

const RightMenu = () => {
    const { userData } = useGlobalContext();
    return (
        <Wrapper>
            {userData ? (
                <>
                    {" "}
                    <FixedWrapper>
                        <SearchInput />
                    </FixedWrapper>
                    {userData && (
                        <AuthMenuWrapper isSearchBar>
                            <AQuienSeguir />
                        </AuthMenuWrapper>
                    )}
                </>
            ) : (
                <AuthMenuWrapper>
                    <AuthMenu />
                </AuthMenuWrapper>
            )}
        </Wrapper>
    );
};

export default RightMenu;
