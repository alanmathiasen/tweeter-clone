import "./App.css";
import { BrowserRouter as Browser, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <Browser basename="/">
      <Sidebar />
      <Routes>
        <Route exact path="/">
          <Home />
        </Route>
      </Routes>
    </Browser>
  );
};

export default App;
