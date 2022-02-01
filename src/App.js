import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Browser, Route, Routes } from "react-router-dom";

import { AppWrapper, RoutesWrapper } from "./App.styles";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import Perfil from "./pages/Perfil";
import Registro from "./pages/Registro";
import TweetGroup from "./components/TweetGroup";
import TweetPage from "./pages/TweetPage";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [usuarioLogueado, setUsuarioLogueado] = useState({});
  const [emailLogueado, setEmailLogueado] = useState("");
  const [datosUser, setDatosUser] = useState({});

  const user = auth.currentUser;

  onAuthStateChanged(auth, (currentUser) => {
    setUsuarioLogueado(currentUser);
  });

  const getDatosUsuario = async () => {
    if (user !== null) {
      const email = user.email;
      setEmailLogueado(email);

      const docRef = doc(db, "usuarios", email);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const detallesUser = {
          biografia: docSnap.data().biografia,
          nombre: docSnap.data().nombre,
          sitioWeb: docSnap.data().sitioWeb,
          ubicacion: docSnap.data().ubicacion,
        };
        setDatosUser(detallesUser);
      } else {
        console.log("No such document!");
      }
    }
  };

  useEffect(() => {
    getDatosUsuario();
  }, [usuarioLogueado]);

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
      </AppWrapper>
    </Browser>
  );
};

export default App;
