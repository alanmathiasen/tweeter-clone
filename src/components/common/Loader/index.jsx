import React from "react";
import { Spinner, SpinnerWrapper } from "./Loader.styles";

const Loader = () => {
    return (
        <SpinnerWrapper>
            <Spinner />
        </SpinnerWrapper>
    );
};

export default Loader;
