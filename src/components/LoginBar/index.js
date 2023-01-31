import React from "react";
import { BarWrapper, CenterTxt, LinksBtn, Button } from "./LoginBar.styles";
import { useNavigate } from "react-router-dom";

const LoginBar = () => {
  const navigate = useNavigate();

  return (
    <BarWrapper>
      <div></div>
      <CenterTxt>
        <h2>No te pierdas lo que está pasando</h2>
        <p>Los usuarios de Twitter son los primeros en enterarse.</p>
      </CenterTxt>
      <LinksBtn>
        <Button
          onClick={() => navigate("/registro")}
          color="#fff"
          border="1px solid #fff"
          bg="none"
          hover="#F7B0B0"
        >
          Iniciar sesión
        </Button>
        <Button
          onClick={() => navigate("/registro")}
          color="#000"
          border="none"
          bg="#fff"
          hover="#dedede"
        >
          Regístrate
        </Button>
      </LinksBtn>
    </BarWrapper>
  );
};

export default LoginBar;
