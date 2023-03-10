import React from "react";
import { LabelWrapper, SpanError } from "./AnimatedInput.styles";

const AnimatedInput = ({ title, error, ...props }) => {
    return (
        <LabelWrapper htmlFor={title} isError={!!error}>
            <input placeholder=" " isError={!!error} {...props} />
            <span>{title}</span>
            {error && <SpanError>{error}</SpanError>}
        </LabelWrapper>
    );
};

export default AnimatedInput;
