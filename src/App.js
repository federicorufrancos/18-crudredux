import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./componentes/Header";
import Productos from "./componentes/Productos";
import EditarProductos from "./componentes/EditarProducto";
import NuevoProducto from "./componentes/NuevoProducto";

//redux
import { Provider } from "react-redux";
import store from "./store";

//init server
//json-server --watch db.json --port 4000

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Productos} />{" "}
            <Route exact path="/productos/nuevo" component={NuevoProducto} />{" "}
            <Route
              exact
              path="/productos/editar/:id"
              component={EditarProductos}
            />{" "}
          </Switch>{" "}
        </div>{" "}
      </Provider>{" "}
    </Router>
  );
};

export default App;
