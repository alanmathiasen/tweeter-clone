import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import { Loader } from "../Loader/Loader.styles";
import { Name, Popup, Wrapper } from "./Tags.styles";

const PopupContent = () => {
    return (
        <div
            onMouseOver={(e) => {
                e.stopPropagation();
            }}
        >
            asdasdsa
        </div>
    );
};

const DisplayUserWithPopup = ({ mention }) => {
    const [mentionRef, setMentionRef] = useState(null);
    const [popperRef, setPopperRef] = useState(null);

    const { styles, attributes } = usePopper(mentionRef, popperRef, { placement: "" });

    const showPopup = () => {
        popperRef.setAttribute("data-show", true);
    };

    const hidePopup = () => {
        setTimeout(() => {
            popperRef.removeAttribute("data-show");
        }, 300);
    };
    console.log(styles.popper, attributes.popper);
    return (
        <Wrapper onMouseEnter={showPopup} onMouseLeave={hidePopup}>
            <Name ref={setMentionRef}>{mention}</Name>

            <Popup ref={setPopperRef} style={styles.popper} {...attributes.popper}>
                <PopupContent />
            </Popup>
        </Wrapper>
    );
};

export default DisplayUserWithPopup;
