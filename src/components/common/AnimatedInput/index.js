import React, { useRef } from "react";
import { LabelWrapper, SpanError } from "./AnimatedInput.styles";

const AnimatedInput = ({ title, error, ...props }) => {
    const ref = useRef(null);
    const handleClick = () => {
        ref.current.focus();
    };
    return (
        <LabelWrapper htmlFor={title} iserror={!!error}>
            <input placeholder=" " iserror={!!error} {...props} ref={ref} />
            <span onClick={handleClick}>{title}</span>
            {error && <SpanError>{error}</SpanError>}
        </LabelWrapper>
    );
};

export default AnimatedInput;
