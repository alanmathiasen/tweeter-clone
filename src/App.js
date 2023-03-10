import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Browser, Route, Routes } from "react-router-dom";

import { AppWrapper, ContentWrapper, RouteWrapper } from "./App.styles";

import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import Perfil from "./pages/Perfil";
import Registro from "./pages/Registro";
import TweetPage from "./pages/TweetPage";
import Siguiendo from "./pages/Siguiendo";
import Seguidores from "./pages/Seguidores";
import RightMenu from "./components/RightMenu";
import LoginBar from "./components/LoginBar";
import Notificaciones from "./pages/Notificaciones";
import Sugeridos from "./pages/Sugeridos";
import { useGlobalContext } from "./context/GlobalContext";
import { PerfilProvider } from "./context/PerfilContext";
import { SugeridosProvider } from "./context/SugeridosContext";

const App = () => {
    const { usuarioLogueado } = useGlobalContext();

    return (
        <Browser>
            <AppWrapper>
                <Sidebar />
                <PerfilProvider>
                    {/* PERFIL CONTEXT PROVIDER */}
                    <SugeridosProvider>
                        <ContentWrapper>
                            <RouteWrapper>
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
                                    <Route exact path="/sugeridos" element={<Sugeridos />} />
                                    <Route exact path="/notificaciones" element={<Notificaciones />} />
                                </Routes>
                            </RouteWrapper>
                            <RightMenu />
                        </ContentWrapper>
                    </SugeridosProvider>
                    {/* PERFIL CONTEXT PROVIDER */}
                </PerfilProvider>
            </AppWrapper>
            {!usuarioLogueado && <LoginBar />}
        </Browser>
    );
};

export default App;
