import "./App.css";
import Header from "./components/Header";
import AddProduct from "./components/AddProduct";
import AllProducts from "./components/AllProducts";
import FarmerLogin from "./components/FarmerLogin";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route path="/add" exact component={AddProduct} />
        <Route path="/product" exact component={AllProducts} />
        <Route path="/login" exact component={FarmerLogin} />
      </div>
    </Router>
  );
}

export default App;
