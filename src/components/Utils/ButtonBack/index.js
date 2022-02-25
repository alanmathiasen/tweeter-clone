import React from "react";
import { BtnBack } from "./ButtonBack.styles";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const ButtonBack = () => {
  const navigate = useNavigate();
  return (
    <BtnBack onClick={() => navigate(-1)}>
      <BiArrowBack />
    </BtnBack>
  );
};

export default ButtonBack;
