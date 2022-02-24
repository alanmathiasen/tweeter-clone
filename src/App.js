import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Browser, Route, Routes } from "react-router-dom";

import { AppWrapper, RoutesWrapper, OverlayModal } from "./App.styles";

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
import RightMenu from "./components/RightMenu";
import TweetModal from "./components/TweetModal";
import LoginBar from "./components/LoginBar";
import { useGlobalContext } from "./context/GlobalContext";

const App = () => {
  const { usuarioLogueado, handleTweettModal, tweettModal } =
    useGlobalContext();

  return (
    <Browser>
      <TweetModal />
      <OverlayModal
        tweettModal={tweettModal}
        onClick={() => handleTweettModal()}
      />
      <AppWrapper>
        <Sidebar />
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
            <Route exact path="/tweet/:id" element={<TweetPage />} />
          </Routes>
          {/* PERFIL CONTEXT PROVIDER */}
        </PerfilProvider>
        <RightMenu />
      </AppWrapper>
      {!usuarioLogueado && <LoginBar />}
    </Browser>
  );
};

export default App;
