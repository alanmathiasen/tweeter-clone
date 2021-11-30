import "./App.css";
import { BrowserRouter as Browser, Route, Routes } from "react-router-dom";

import { AppWrapper } from "./App.styles";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import Perfil from "./pages/Perfil";

const App = () => {
  return (
    <Browser>
      <AppWrapper>
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/perfil" element={<Perfil />} />
        </Routes>
      </AppWrapper>
    </Browser>
  );
};

export default App;
