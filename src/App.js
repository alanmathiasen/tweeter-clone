import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <div>
      <Sidebar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
