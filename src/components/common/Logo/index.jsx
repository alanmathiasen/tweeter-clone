import React from "react";
import TweeterLogo from "../../../imgs/tweetter-logo.png";
import { ImageLogo } from "./Logo.styles";

const Logo = ({ height }) => {
    return <ImageLogo height={height} src={TweeterLogo} alt="" />;
};

export default Logo;
