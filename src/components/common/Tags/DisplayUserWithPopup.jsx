import React, { useContext, useEffect, useState } from "react";
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
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useInteractions,
    useHover,
    FloatingPortal,
} from "@floating-ui/react";
import { getUsersByQuery } from "../../../firebase/userCrud";
import imgPerfil from "../../../imgs/perfil.jpg";
import { ImgPerfil } from "../../TweetIndividual/TweetIndividual.styles";
import { GlobalContext, useGlobalContext } from "../../../context/GlobalContext";

const PopoverContent = ({ username }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        (async () => {
            const user = await getUsersByQuery("route", username);
            setUser(user[0]);
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
                        <button>seguir</button>
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

const DisplayUserWithPopup = ({ route, children }) => {
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
                {children}
            </Name>
            {isOpen && (
                <FloatingPortal>
                    <Popover
                        ref={refs.setFloating}
                        style={{ position: strategy, top: y ?? 0, left: x ?? 0, width: "max-content" }}
                        {...getFloatingProps()}
                    >
                        <PopoverContent username={route} />
                    </Popover>
                </FloatingPortal>
            )}
        </Wrapper>
    );
};
export default DisplayUserWithPopup;
