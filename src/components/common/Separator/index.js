import React from "react";
import { Line, SeparatorWrapper, Text } from "./Separator.styles";

const Separator = ({ children }) => {
    return (
        <SeparatorWrapper>
            <Line />
            {children && <Text>{children}</Text>}
            <Line />
        </SeparatorWrapper>
    );
};

export default Separator;
