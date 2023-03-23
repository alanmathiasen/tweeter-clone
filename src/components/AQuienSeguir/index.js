import React, { useState, useEffect } from "react";
import {
    ArticleWrapper,
    Tittle,
    CardWrapper,
    Card,
    ImagePerfil,
    CardContent,
    InfoUser,
    MostrarMas,
    ButtonMargin,
} from "./AQuienSeguir.styles";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import ImgPerfil from "../../imgs/perfil.jpg";
import { FollowButton } from "../common/FollowButton";
import { useGlobalContext } from "../../context/GlobalContext";
import { usePerfilContext } from "../../context/PerfilContext";
import { useSugeridosContext } from "../../context/SugeridosContext";

const AQuienSeguir = () => {
    const navigate = useNavigate();
    const { userData } = useGlobalContext();
    const { handleFollow } = usePerfilContext();
    const {
        arrayDatos,
        setArrayDatos,
        filteredArray,
        setFilteredArray,
        siguiendo,
        setSiguiendo,
        arrayUsersEnComun,
        setArrayUsersEnComun,
        moreInCommun,
        setMoreInCommun,
    } = useSugeridosContext();

    const [btnState, setBtnState] = useState(false);

    useEffect(() => {
        //fetch de todos los users, filtrando el logueado
        const getDatosUsers = async () => {
            let mailToFilter = userData.email;
            const docRef = collection(db, "usuarios");
            const filterRef = query(docRef, where("email", "!=", mailToFilter));
            const querySnapshot = await getDocs(filterRef);
            querySnapshot.forEach((doc) => {
                let arrayNew = [];
                arrayNew = doc.data();
                arrayNew.id = doc.id;
                setArrayDatos((arrayDatos) => [...arrayDatos, arrayNew]);
            });
        };
        if (userData.email) {
            getDatosUsers();
        }
    }, [userData.email]);

    useEffect(() => {
        setSiguiendo(userData.following || []);
    }, [userData]);

    useEffect(() => {
        //filter users que no se siguen
        const filterData = () => {
            let forDelete = userData.email;
            let newArray = arrayDatos.filter((item) => {
                return !item.seguidores.includes(forDelete);
            });
            setFilteredArray(newArray);
        };

        if (arrayDatos) {
            filterData();
        }
    }, [arrayDatos]);

    // useEffect(() => {
    //     const handleLastFilter = () => {
    //         let arrayUsers = [];
    //         let arrayConUbi = [];
    //         //filter user por ubicacion
    //         if (userData.location) {
    //             arrayConUbi = filteredArray.filter((item) => {
    //                 return item.ubicacion === datosUser.ubicacion;
    //             });
    //         }
    //         arrayUsers.push(
    //             (arrayUsers = filteredArray.filter((item) => {
    //                 return item.siguiendo.length > 0;
    //             }))
    //         );
    //         arrayUsers.push.apply(arrayUsers, arrayConUbi);
    //         setArrayUsersEnComun(arrayUsers);
    //         let seguidoresEnComun = siguiendo;
    //         //filter users por seguidores en comun
    //         if (siguiendo) {
    //             let result = arrayUsers.filter((item) => {
    //                 return item.siguiendo.some((el) => seguidoresEnComun.indexOf(el) >= 0);
    //             });
    //             //agrega otros users
    //             //si hay menos de 2 users con seguidores en comun
    //             if (result.length < 3) {
    //                 let newArray = arrayUsersEnComun.filter((el) => result.indexOf(el) === -1);
    //                 let concatArr = result.concat(newArray);
    //                 setMoreInCommun(concatArr);
    //             } else {
    //                 setMoreInCommun(result);
    //             }
    //         }
    //     };

    //     handleLastFilter();
    // }, [filteredArray, siguiendo]);

    const handleClick = (uId) => {
        handleFollow(uId);
        setBtnState(!btnState);
    };

    return (
        <ArticleWrapper>
            <Tittle>A quién Seguir</Tittle>
            <CardWrapper>
                {moreInCommun.length >= 3 &&
                    moreInCommun.slice(0, 3).map((item, index) => {
                        let rutaId = item.ruta;
                        return (
                            <Card key={index} onClick={() => navigate("/" + rutaId)}>
                                <CardContent>
                                    {item.photoURL ? (
                                        <ImagePerfil
                                            src={item.photoURL}
                                            alt={`'Img perfil '${item.nombre}`}
                                            referrerPolicy="no-referrer"
                                        />
                                    ) : (
                                        <ImagePerfil src={ImgPerfil} alt={`'Img perfil '${item.nombre}`} />
                                    )}
                                    <InfoUser>
                                        <h3>{item.nombre}</h3>
                                        <p>@{item.ruta}</p>
                                    </InfoUser>
                                </CardContent>

                                <ButtonMargin>
                                    {userData.following.includes(item.id) ? (
                                        <FollowButton
                                            onClick={() => handleClick(item.id)}
                                            btnState={btnState}
                                            color={"#000"}
                                            bg={"#fff"}
                                            maxWidth={"200px"}
                                            hoverColor={"red"}
                                            hoverBgColor={"#ff9f9f"}
                                            contentTxt={"Dejar de seguir"}
                                        >
                                            <span>Siguiendo</span>
                                        </FollowButton>
                                    ) : (
                                        <FollowButton onClick={() => handleClick(item.id)} contentTxt={"Seguir"}>
                                            <span>Seguir</span>
                                        </FollowButton>
                                    )}
                                </ButtonMargin>
                            </Card>
                        );
                    })}
                {moreInCommun.length < 3 &&
                    arrayUsersEnComun.slice(0, 3).map((item, index) => {
                        let rutaId = item.route;
                        return (
                            <Card key={index} onClick={() => navigate("/" + rutaId)}>
                                <CardContent>
                                    {item.photoURL ? (
                                        <ImagePerfil src={item.photoURL} alt={`'Img perfil '${item.username}`} />
                                    ) : (
                                        <ImagePerfil src={ImgPerfil} alt={`'Img perfil '${item.username}`} />
                                    )}
                                    <InfoUser>
                                        <h3>{item.username}</h3>
                                        <p>@{item.route}</p>
                                    </InfoUser>
                                </CardContent>

                                <ButtonMargin>
                                    {userData.siguiendo.includes(item.id) ? (
                                        <FollowButton
                                            onClick={() => handleClick(item.id)}
                                            btnState={btnState}
                                            color={"#000"}
                                            bg={"#fff"}
                                            maxWidth={"200px"}
                                            hoverColor={"red"}
                                            hoverBgColor={"#ff9f9f"}
                                            contentTxt={"Dejar de seguir"}
                                        >
                                            <span>Siguiendo</span>
                                        </FollowButton>
                                    ) : (
                                        <FollowButton onClick={() => handleClick(item.id)} contentTxt={"Seguir"}>
                                            <span>Seguir</span>
                                        </FollowButton>
                                    )}
                                </ButtonMargin>
                            </Card>
                        );
                    })}
                <MostrarMas onClick={() => navigate("/sugeridos")}>
                    <p>Mostrar más</p>
                </MostrarMas>
            </CardWrapper>
        </ArticleWrapper>
    );
};

export default AQuienSeguir;
