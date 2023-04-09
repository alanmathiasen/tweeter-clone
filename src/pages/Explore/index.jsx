import React from "react";
import { Outlet } from "react-router-dom";
import { Wrapper } from "./Explore.styles";
const Explore = () => {
    return (
        <Wrapper>
            <Outlet />
        </Wrapper>
    );
};

export default Explore;
