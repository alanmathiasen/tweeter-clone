import React from "react";
import { Outlet } from "react-router-dom";
import SearchInput from "../../components/common/SearchInput";
import { Wrapper } from "./Explore.styles";
const Explore = () => {
    return (
        <Wrapper>
            <SearchInput />

            <Outlet />
        </Wrapper>
    );
};

export default Explore;
