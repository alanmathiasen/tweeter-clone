import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
    FollowWrapper,
    SectionWrapper,
    Line,
    LinkText,
    SecondaryText,
    ArticleWrapper,
    NoContentWrpapper,
    UserCard,
    SiguiendoBtn,
    UserCardContent,
    ImagePerfil,
} from "./Siguiendo.styles";
import PerfilNav from "../../components/PerfilComponents/PerfilNav";
import { Link } from "react-router-dom";
import { ButtonColored } from "../../components/common/ButtonColored";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ButtonSeguir } from "../../components/common/ButtonSeguir";
import { useGlobalContext } from "../../context/GlobalContext";
import { usePerfilContext } from "../../context/PerfilContext";
import ImgPerfil from "../../imgs/perfil.jpg";

const Siguiendo = () => {
    const { datosUser } = useGlobalContext();
    const { currentPerfil, currentPerfilMail, handleLoad, setPageItsLoad, pageItsLoad, getDatosPerfil, handleFollow } =
        usePerfilContext();

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [mailsToCheck, setMailsToCheck] = useState([]);
    const [usersFollowing, setUsersFollowing] = useState([]);
    const [btnState, setBtnState] = useState(false);

    useEffect(() => {
        setPageItsLoad(false);
    }, []);

    useEffect(() => {
        getDatosPerfil(id);

        const handleFollowers = () => {
            if (currentPerfil.siguiendo) {
                let result = currentPerfil.siguiendo.map((item) => {
                    return item;
                });
                setMailsToCheck(result);
            }
        };
        const getFollowing = async () => {
            const usuariosRef = collection(db, "usuarios");
            const followingUsers = query(usuariosRef, where("seguidores", "array-contains", currentPerfilMail));
            const querySnapshot = await getDocs(followingUsers);
            querySnapshot.forEach((doc) => {
                let newArray = [];
                newArray = doc.data();
                newArray.id = doc.id;

                let checkExist = false;
                usersFollowing.map((item) => {
                    item.id.includes(newArray.id) ? (checkExist = true) : (checkExist = false);
                });
                if (checkExist === false) {
                    setUsersFollowing((usersFollowing) => [...usersFollowing, newArray]);
                    console.log("cargando state");
                } else {
                    return;
                }
            });
        };
        handleLoad();
        //VALIDA QUE BUSQUE SOLO LOS SEGUIDORES EL PERFIL ACTUAL
        if (currentPerfil.ruta === id) {
            handleFollowers();
            getFollowing();
        }
    }, [currentPerfilMail, datosUser]);

    const handleClick = (uId) => {
        handleFollow(uId);
        setBtnState(!btnState);
    };
    const goTo = (newRute) => {
        navigate("/" + newRute);
    };

    if (!pageItsLoad) {
        return <div></div>;
    }

    return (
        <FollowWrapper>
            <PerfilNav />
            <SectionWrapper>
                <Link to={`/${id}/seguidores`}>
                    <SecondaryText>Seguidores</SecondaryText>
                </Link>
                <Link to={`/${id}/siguiendo`}>
                    <LinkText>Siguiendo</LinkText>
                    <Line> </Line>
                </Link>
            </SectionWrapper>
            <ArticleWrapper>
                {currentPerfil.siguiendo && currentPerfil.siguiendo.length > 0 ? (
                    usersFollowing.map((user, index) => {
                        let newRute = user.ruta;
                        return (
                            <UserCard key={index}>
                                <div className="datos-container">
                                    {user.photoURL ? (
                                        <ImagePerfil src={user.photoURL} alt={`'Img perfil '${user.nombre}`} />
                                    ) : (
                                        <ImagePerfil src={ImgPerfil} alt={`'Img perfil '${user.nombre}`} />
                                    )}
                                    <div onClick={() => goTo(newRute)}>
                                        <UserCardContent>
                                            <h3>{user.nombre}</h3>
                                            <span>@{user.ruta}</span>
                                            <p>{user.biografia}</p>
                                        </UserCardContent>
                                    </div>
                                </div>
                                {datosUser.siguiendo.includes(user.id) ? (
                                    <ButtonSeguir
                                        onClick={() => handleClick(user.id)}
                                        btnState={btnState}
                                        color={"#000"}
                                        bg={"#fff"}
                                        maxWidth={"200px"}
                                        hoverColor={"red"}
                                        hoverBgColor={"#ff9f9f"}
                                        contentTxt={"Dejar de seguir"}
                                    >
                                        <span>Siguiendo</span>
                                    </ButtonSeguir>
                                ) : (
                                    <ButtonSeguir onClick={() => handleClick(user.id)} contentTxt={"Seguir"}>
                                        <span>Seguir</span>
                                    </ButtonSeguir>
                                )}
                            </UserCard>
                        );
                    })
                ) : (
                    <NoContentWrpapper>
                        <h2>No sigues a nadie</h2>
                        <p>Cuando lo hagas, aparecerán aquí, y tú podrás ver sus Tweets en tu cronología.</p>
                        <ButtonColored children="Encuentra personas para seguir" />
                    </NoContentWrpapper>
                )}
            </ArticleWrapper>
        </FollowWrapper>
    );
};

export default Siguiendo;
