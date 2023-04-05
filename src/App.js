import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Browser, Route, Routes } from "react-router-dom";

import { AppWrapper, ContentWrapper, RouteWrapper } from "./App.styles";

import Home from "./pages/Home";
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
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { ModalProvider, useModalContext } from "./context/ModalContext";
import Modals from "./components/Modals";
import Explore from "./pages/Explore";
import ExploreTagList from "./components/common/ExploreTagList";
import TweetsByTag from "./components/TweetsByTag";
const App = () => {
    const { userData } = useGlobalContext();

    return (
        <Browser>
            <ThemeProvider theme={theme}>
                <AppWrapper>
                    <Sidebar />
                    <PerfilProvider>
                        {/* PERFIL CONTEXT PROVIDER */}
                        <SugeridosProvider>
                            <ModalProvider>
                                <ContentWrapper>
                                    <RouteWrapper>
                                        <Routes>
                                            <Route exact path="/" element={<Home />} />
                                            <Route exact path="/explore" element={<Explore />}>
                                                <Route exact path="" element={<ExploreTagList />} />
                                                <Route exact path=":tag" element={<TweetsByTag />} />
                                            </Route>

                                            <Route exact path="/:id" element={<Perfil />}>
                                                <Route exact path="" element={"hola"}></Route>
                                            </Route>
                                            <Route exact path="/registro" element={<Registro />} />
                                            <Route exact path="/:id/siguiendo" element={<Siguiendo />} />
                                            <Route exact path="/:id/seguidores" element={<Seguidores />} />
                                            <Route exact path="/tweet/:id" element={<TweetPage />} />
                                            <Route exact path="/sugeridos" element={<Sugeridos />} />
                                            <Route exact path="/notificaciones" element={<Notificaciones />} />
                                        </Routes>
                                    </RouteWrapper>
                                    <RightMenu />
                                    <Modals />
                                    {!userData && <LoginBar />}
                                </ContentWrapper>
                            </ModalProvider>
                        </SugeridosProvider>
                        {/* PERFIL CONTEXT PROVIDER */}
                    </PerfilProvider>
                </AppWrapper>
            </ThemeProvider>
        </Browser>
    );
};

export default App;
