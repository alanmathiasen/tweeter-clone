import React from "react";
import { LabelWrapper } from "./AnimatedInput.styles";

const AnimatedInput = ({ title = "Name", type = "text" }) => {
    return (
        <LabelWrapper htmlFor={title}>
            <input type={type} name={title} placeholder=" " />
            <span>{title}</span>
        </LabelWrapper>
    );
};

export default AnimatedInput;
