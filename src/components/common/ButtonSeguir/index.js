import React from "react";
import { BtnSeguir } from "./ButtonSeguir.styles";

export const ButtonSeguir = ({ children, ...buttonProps }) => {
  return <BtnSeguir {...buttonProps}>{children}</BtnSeguir>;
};
