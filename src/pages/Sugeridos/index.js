import React, { useState, useEffect } from "react";
import { Nav, ButtonContainer, Wrapper } from "./Sugeridos.styles";
import ButtonBack from "../../components/common/ButtonBack";
import {
    Card,
    CardWrapper,
    ImagePerfil,
    InfoUser,
    CardContent,
} from "../../components/AQuienSeguir/AQuienSeguir.styles";
import ImgPerfil from "../../imgs/perfil.jpg";
import { useGlobalContext } from "../../context/GlobalContext";
import { usePerfilContext } from "../../context/PerfilContext";
import { useSugeridosContext } from "../../context/SugeridosContext";
import { FollowButton } from "../../components/common/FollowButton";

const Sugeridos = () => {
    const { datosUser } = useGlobalContext();
    const { handleFollow } = usePerfilContext();
    const { filteredArray } = useSugeridosContext();
    const [btnState, setBtnState] = useState(false);

    const handleClick = (uId) => {
        handleFollow(uId);
        setBtnState(!btnState);
    };

    return (
        <div>
            <Nav>
                <ButtonContainer>
                    <ButtonBack />
                </ButtonContainer>
                <h2>Conectar</h2>
            </Nav>
            <Wrapper>
                <h3>Sugeridos para ti</h3>
                <CardWrapper>
                    {filteredArray &&
                        filteredArray.map((item, index) => {
                            return (
                                <Card key={index}>
                                    <CardContent>
                                        {item.photoURL ? (
                                            <ImagePerfil src={item.photoURL} alt={`'Img perfil '${item.nombre}`} />
                                        ) : (
                                            <ImagePerfil src={ImgPerfil} alt={`'Img perfil '${item.nombre}`} />
                                        )}
                                        <InfoUser>
                                            <h3>{item.nombre}</h3>
                                            <p>@{item.ruta}</p>
                                            <span>{item.biografia}</span>
                                        </InfoUser>
                                    </CardContent>
                                    {datosUser.siguiendo.includes(item.id) ? (
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
                                </Card>
                            );
                        })}
                </CardWrapper>
            </Wrapper>
        </div>
    );
};

export default Sugeridos;
