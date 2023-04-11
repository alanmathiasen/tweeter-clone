import React, { useEffect, useState } from "react";
import { Wrapper, FixedWrapper, TrendingWrapper } from "./RightMenu.styles";
import AQuienSeguir from "../AQuienSeguir";
import { useGlobalContext } from "../../context/GlobalContext";
import AuthMenu from "./AuthMenu";
import SearchInput from "../common/SearchInput";
import ExploreTagList from "../common/ExploreTagList";
import { ShowMore } from "../AQuienSeguir/AQuienSeguir.styles";
import { useNavigate } from "react-router-dom";
import Sticky from "react-stickynode";

const RightMenu = () => {
    const { userData } = useGlobalContext();
    const navigate = useNavigate();
    const handleStateChange = (status) => {
        console.log({ status: status.status });
    };
    return (
        <Wrapper>
            <FixedWrapper>
                <SearchInput />
            </FixedWrapper>
            <div style={{ height: "48px" }}></div>
            <Sticky top={48}>
                {userData ? (
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
                ) : (
                    <AuthMenu />
                )}
            </Sticky>
        </Wrapper>
    );
};

export default RightMenu;
