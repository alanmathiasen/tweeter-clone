import React, { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader.styles";
import { Name, Popup, PopupWrapper, Wrapper } from "./Tags.styles";
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useInteractions,
    FloatingFocusManager,
    useHover,
} from "@floating-ui/react";
const PopupContent = () => {
    return (
        <PopupWrapper
            onMouseOver={(e) => {
                e.stopPropagation();
            }}
        >
            asdasdsa
        </PopupWrapper>
    );
};

const DisplayUserWithPopup = ({ mention }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { x, y, refs, strategy, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [offset(10), flip({ fallbackAxisSideDirection: "end" }), shift()],
        whileElementsMounted: autoUpdate,
    });

    const hover = useHover(context, { delay: { close: 300 } });

    const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

    return (
        <Wrapper>
            <Name ref={refs.setReference} {...getReferenceProps()}>
                {mention}
            </Name>
            {isOpen && (
                <FloatingFocusManager context={context}>
                    <Popup
                        ref={refs.setFloating}
                        style={{ position: strategy, top: y ?? 0, left: x ?? 0, width: "max-content" }}
                        {...getFloatingProps()}
                    >
                        <PopupContent />
                    </Popup>
                </FloatingFocusManager>
            )}
        </Wrapper>
    );
};
export default DisplayUserWithPopup;
