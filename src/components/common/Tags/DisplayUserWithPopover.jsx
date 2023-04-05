import React, { useEffect, useState } from "react";
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useInteractions,
    useHover,
    FloatingPortal,
    useDismiss,
    useTransitionStyles,
} from "@floating-ui/react";
import Loader from "../Loader";
import {
    Followers,
    Following,
    LoaderWrapper,
    Name,
    Popover,
    PopoverBody,
    PopoverHeader,
    PopoverImg,
    PopoverWrapper,
    Route,
    UserFollowData,
    Username,
    Wrapper,
} from "./Tags.styles";
import { getUsersByQuery } from "../../../firebase/userCrud";
import imgPerfil from "../../../imgs/perfil.jpg";
import { FollowButton } from "../FollowButton";

const PopoverContent = ({ username }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        (async () => {
            const userDB = await getUsersByQuery("route", username);
            console.log(userDB);
            setUser(userDB[0]);
        })();
    }, []);

    return (
        <PopoverWrapper>
            {user ? (
                <>
                    <PopoverHeader>
                        <PopoverImg>
                            <img
                                src={user.photoURL || imgPerfil}
                                referrerPolicy="no-referrer"
                                alt={`${user.username} profile`}
                            />
                        </PopoverImg>
                        <FollowButton mentionUserId={user.email} />
                    </PopoverHeader>
                    <PopoverBody>
                        <Username>{user.username}</Username>
                        <Route>@{user.route}</Route>
                        <p>{user.biography && user.biography}</p>
                        <UserFollowData>
                            <Following>
                                {user.following.length} <span>siguiendo</span>
                            </Following>{" "}
                            <Followers>
                                {user.followers.length} <span>seguidores</span>
                            </Followers>
                        </UserFollowData>
                    </PopoverBody>
                </>
            ) : (
                <LoaderWrapper>
                    <Loader />
                </LoaderWrapper>
            )}
        </PopoverWrapper>
    );
};

const DisplayUserWithPopover = ({ route, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { x, y, refs, strategy, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [offset(10), flip({ fallbackAxisSideDirection: "end" }), shift()],
        whileElementsMounted: autoUpdate,
    });
    const { isMounted, styles } = useTransitionStyles(context);
    const hover = useHover(context, { delay: 300 });
    const dismiss = useDismiss(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([hover, dismiss]);
    return (
        <Wrapper>
            <Name ref={refs.setReference} {...getReferenceProps()}>
                {children}
            </Name>
            {isMounted && (
                <FloatingPortal context={context}>
                    <Popover
                        ref={refs.setFloating}
                        style={{ position: strategy, top: y ?? 0, left: x ?? 0, width: "max-content", ...styles }}
                        {...getFloatingProps()}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <PopoverContent username={route} />
                    </Popover>
                </FloatingPortal>
            )}
        </Wrapper>
    );
};
export default DisplayUserWithPopover;
