import React from "react";
import { Wrapper, StickyWrapper, FixedWrapper, AuthMenuWrapper, TrendingWrapper } from "./RightMenu.styles";
import AQuienSeguir from "../AQuienSeguir";
import { useGlobalContext } from "../../context/GlobalContext";
import AuthMenu from "./AuthMenu";
import SearchInput from "../common/SearchInput";
import ExploreTagList from "../common/ExploreTagList";
import { ShowMore } from "../AQuienSeguir/AQuienSeguir.styles";
import { useNavigate } from "react-router-dom";

const RightMenu = () => {
    const { userData } = useGlobalContext();
    const navigate = useNavigate();
    if (!userData)
        return (
            <Wrapper>
                <AuthMenu />
            </Wrapper>
        );
    return (
        <Wrapper>
            {userData && (
                <>
                    {" "}
                    <FixedWrapper>
                        <SearchInput />
                    </FixedWrapper>
                    {userData && (
                        <>
                            <TrendingWrapper isSearchBar>
                                <h2>Qué está pasando</h2>
                                <ExploreTagList />{" "}
                                <ShowMore onClick={() => navigate("/explore")}>
                                    <p>Mostrar más</p>
                                </ShowMore>
                            </TrendingWrapper>
                            <TrendingWrapper>
                                <AQuienSeguir />
                            </TrendingWrapper>
                        </>
                    )}
                </>
            )}
        </Wrapper>
    );
};

export default RightMenu;
