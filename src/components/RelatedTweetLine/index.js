import React from "react";
import { Up, Down } from "./RelatedTweetLine.styles";

const RelatedTweetLine = ({ hasUp, hasDown, paddingLeft }) => {
    return (
        <>
            {hasUp && <Up left={paddingLeft} />}
            {hasDown && <Down hasDown left={paddingLeft} />}
        </>
    );
};

export default RelatedTweetLine;
