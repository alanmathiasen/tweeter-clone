import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { LoaderWrapper, Name, Popup, PopupWrapper, Wrapper } from "./Tags.styles";
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useInteractions,
    FloatingFocusManager,
    useHover,
    FloatingPortal,
} from "@floating-ui/react";
import { getUserByRoute, getUsersByQuery } from "../../../firebase/userCrud";
const PopupContent = ({ username }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        (async () => {
            const user = await getUsersByQuery(username);
            setUser(user[0]);
        })();
    }, []);
    console.log({ user });
    return (
        <PopupWrapper
            onMouseOver={(e) => {
                e.stopPropagation();
            }}
        >
            {user ? (
                <div>{user.nombre}</div>
            ) : (
                <LoaderWrapper>
                    <Loader />
                </LoaderWrapper>
            )}
        </PopupWrapper>
    );
};

const DisplayUserWithPopup = ({ mention, addAt }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { x, y, refs, strategy, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [offset(10), flip({ fallbackAxisSideDirection: "end" }), shift()],
        whileElementsMounted: autoUpdate,
    });

    const hover = useHover(context, { delay: 300 });

    const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

    return (
        <Wrapper>
            <Name ref={refs.setReference} {...getReferenceProps()}>
                {addAt ? "@" + mention : mention}
            </Name>
            {isOpen && (
                <FloatingPortal>
                    <Popup
                        ref={refs.setFloating}
                        style={{ position: strategy, top: y ?? 0, left: x ?? 0, width: "max-content" }}
                        {...getFloatingProps()}
                    >
                        <PopupContent username={mention} />
                    </Popup>
                </FloatingPortal>
            )}
        </Wrapper>
    );
};
export default DisplayUserWithPopup;
