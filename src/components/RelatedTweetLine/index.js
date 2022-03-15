import React from "react";
import { Up, Down } from "./RelatedTweetLine.styles";

const RelatedTweetLine = ({ hasUp, hasDown, left }) => {
    return (
        <>
            {hasUp && <Up left={left} />}
            {hasDown && <Down hasDown left={left} />}
        </>
    );
};

export default RelatedTweetLine;
