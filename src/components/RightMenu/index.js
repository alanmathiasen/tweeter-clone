import React from "react";
import { BuscarWrapper, Buscar } from "./RightMenu.styles";
import { RiSearchLine } from "react-icons/ri";
import AQuienSeguir from "../AQuienSeguir";

const RightMenu = () => {
  return (
    <div>
      <BuscarWrapper>
        {/* <span>
          <RiSearchLine />
        </span> */}
        <Buscar placeholder="Buscar en tweeter" />
      </BuscarWrapper>
      <AQuienSeguir />
    </div>
  );
};

export default RightMenu;
