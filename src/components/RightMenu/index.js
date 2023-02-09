import React from "react";
import { BuscarWrapper, Buscar } from "./RightMenu.styles";
import { RiSearchLine } from "react-icons/ri";
import AQuienSeguir from "../AQuienSeguir";
import { useGlobalContext } from "../../context/GlobalContext";

const RightMenu = () => {
    const { usuarioLogueado } = useGlobalContext();
    console.log(usuarioLogueado);
    return (
        <div>
            <BuscarWrapper>
                {/* <span>
          <RiSearchLine />
        </span> */}
                <Buscar placeholder="Buscar en tweeter" />
            </BuscarWrapper>
            {usuarioLogueado && <AQuienSeguir />}
        </div>
    );
};

export default RightMenu;
