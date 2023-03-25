import React, { useState } from "react";
import { useGlobalContext } from "../../../context/GlobalContext";
import useHoverButton from "../../../hooks/useHoverButton";
import { Following, StopFollowing } from "./FollowButton.styles";

export const FollowButton = ({ children, ...buttonProps }) => {
    const { userData } = useGlobalContext();
    const [isFollowing, setIsFollowing] = useState(false);
    const [isHovering, hoverProps] = useHoverButton();
    const handleFollow = (e) => {
        e.stopPropagation();
        setIsFollowing(!isFollowing);
    };
    const handleUnfollow = (e) => {
        e.stopPropagation();
        setIsFollowing(!isFollowing);
    };

    // const handleFollow = async (id) => {
    //   setHandleFollowButton(!handleFollowButton);
    //   let mailASeguir = currentPerfilMail;
    //   if (mailASeguir) {
    //     if (id) {
    //       let boolean = datosUser.siguiendo.includes(id);

    //       if (boolean === true) {
    //         const logguedUserRef = await updateDoc(
    //           doc(db, "usuarios", emailLogueado),
    //           {
    //             siguiendo: arrayRemove(id),
    //           }
    //         );
    //         const seguidoRef = await updateDoc(doc(db, "usuarios", id), {
    //           seguidores: arrayRemove(emailLogueado),
    //         });
    //         //UPDATE LOCAL USER STATE
    //         const newArray = datosUser.siguiendo.filter((item) => item !== id);
    //         setDatosUser({ ...datosUser, siguiendo: newArray });
    //       } else {
    //         const logguedUserRef = await updateDoc(
    //           doc(db, "usuarios", emailLogueado),
    //           {
    //             siguiendo: arrayUnion(id),
    //           }
    //         );

    //         const seguidoRef = await updateDoc(doc(db, "usuarios", id), {
    //           seguidores: arrayUnion(emailLogueado),
    //         });
    //         //UPDATE LOCAL USER STATE
    //         setDatosUser({
    //           ...datosUser,
    //           siguiendo: [...datosUser.siguiendo, id],
    //         });

    //         setNoti(true);
    //       }
    //     } else {
    //       if (handleFollowButton) {
    //         const logguedUserRef = await updateDoc(
    //           doc(db, "usuarios", emailLogueado),
    //           {
    //             siguiendo: arrayRemove(mailASeguir),
    //           }
    //         );
    //         const seguidoRef = await updateDoc(doc(db, "usuarios", mailASeguir), {
    //           seguidores: arrayRemove(emailLogueado),
    //         });
    //         //UPDATE LOCAL USER STATE
    //         const newArray = datosUser.siguiendo.filter(
    //           (item) => item !== mailASeguir
    //         );
    //         setDatosUser({ ...datosUser, siguiendo: newArray });
    //       } else {
    //         const logguedUserRef = await updateDoc(
    //           doc(db, "usuarios", emailLogueado),
    //           {
    //             siguiendo: arrayUnion(mailASeguir),
    //           }
    //         );

    //         const seguidoRef = await updateDoc(doc(db, "usuarios", mailASeguir), {
    //           seguidores: arrayUnion(emailLogueado),
    //         });
    //         //UPDATE LOCAL USER STATE
    //         setDatosUser({
    //           ...datosUser,
    //           siguiendo: [...datosUser.siguiendo, mailASeguir],
    //         });
    //       }
    //     }
    //   }
    // };

    const handleFollowUser = () => {};
    // return (
    //     <>
    //         {datosUser.siguiendo.includes(userToFollowId) ? (
    //             <ButtonSeguir
    //                 onClick={handleFollowUser}
    //                 btnState={btnState}
    //                 color={"#000"}
    //                 bg={"#fff"}
    //                 maxWidth={"200px"}
    //                 hoverColor={"red"}
    //                 hoverBgColor={"#ff9f9f"}
    //                 contentTxt={"Dejar de seguir"}
    //             >
    //                 <span>Siguiendo</span>
    //             </ButtonSeguir>
    //         ) : (
    //             <ButtonSeguir onClick={() => handleClick(userToFollowId)} contentTxt={"Seguir"}>
    //                 <span>Seguir</span>
    //             </ButtonSeguir>
    //         )}
    //     </>
    // );
    return (
        <>
            {isFollowing ? (
                <Following onClick={handleFollow}>Seguir</Following>
            ) : (
                <StopFollowing onClick={handleUnfollow} {...hoverProps}>
                    {isHovering ? "Dejar de seguir" : "Siguiendo"}
                </StopFollowing>
            )}
        </>
    );
    // <BtnSeguir {...buttonProps}>{children}</BtnSeguir>;
};
