import React from "react";
import { CustomButton } from "./ButtonColored.styles";

export const ButtonColored = ({ children, ...buttonProps }) => {
  return <CustomButton {...buttonProps}>{children}</CustomButton>;
};
