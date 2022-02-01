import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Browser, Route, Routes } from "react-router-dom";

import { AppWrapper, RoutesWrapper } from "./App.styles";
import { AppWrapper } from "./App.styles";
import { PerfilProvider } from "./context/PerfilContext";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import Perfil from "./pages/Perfil";
import Registro from "./pages/Registro";
import TweetGroup from "./components/TweetGroup";
import TweetPage from "./pages/TweetPage";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Siguiendo from "./pages/Siguiendo";
import Seguidores from "./pages/Seguidores";

import { useGlobalContext } from "./context/GlobalContext";

const App = () => {
  const { usuarioLogueado } = useGlobalContext();

  // useEffect(() => {
  //   getDatosUsuario();
  // }, [usuarioLogueado]);

  return (
    <Browser>
      <AppWrapper>
        <Sidebar />
        <RoutesWrapper>
          <Routes>
            {usuarioLogueado ? (
              <Route
                exact
                path="/"
                element={<Home correoUsuario={usuarioLogueado.email} />}
              />
            ) : (
              <Route exact path="/" element={<Home />} />
            )}

            <Route
              exact
              path="/perfil"
              element={
                <Perfil
                  correoUsuario={usuarioLogueado}
                  emailLogueado={emailLogueado}
                  datosUser={datosUser}
                  setDatosUser={setDatosUser}
                />
              }
            />
            <Route exact path="/registro" element={<Registro />} />
            <Route
              exact
              path="/tweet/:id/:correoUsuario"
              element={<TweetPage />}
            />
          </Routes>
        </RoutesWrapper>
        <PerfilProvider>
          {/* PERFIL CONTEXT PROVIDER */}
          <Routes>
            {usuarioLogueado ? (
              <Route exact path="/" element={<Home />} />
            ) : (
              <Route exact path="/" element={<Home />} />
            )}
            <Route exact path="/:id" element={<Perfil />} />
            <Route exact path="/registro" element={<Registro />} />
            <Route exact path="/:id/siguiendo" element={<Siguiendo />} />
            <Route exact path="/:id/seguidores" element={<Seguidores />} />
          </Routes>
          {/* PERFIL CONTEXT PROVIDER */}
        </PerfilProvider>
      </AppWrapper>
    </Browser>
  );
};

export default App;
