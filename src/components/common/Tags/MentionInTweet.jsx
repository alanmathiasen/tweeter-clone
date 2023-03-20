import React, { useState } from "react";
import { usePopper } from "react-popper";
import { Loader } from "../Loader/Loader.styles";

const MentionInTweet = ({ mention }) => {
    const [mentionRef, setMentionRef] = useState(null);
    const [popperRef, setPopperRef] = useState(null);

    const { styles, attributes } = usePopper(mentionRef, popperRef);

    return (
        <>
            <span ref={setMentionRef}>@{mention}</span>
            <div ref={setPopperRef} style={styles.popper} {...attributes.popper}>
                asd
            </div>
        </>
    );
};

export default MentionInTweet;
