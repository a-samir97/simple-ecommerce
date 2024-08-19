import React from "react";
import './App.css';
import CreationStepsComponent from "./pages/CreationSteps";
import {Routes, Route} from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path={"/login/"} element={<LoginPage />} />
            {/* Creation routes */}
            <Route path={"/create-product/"} element={<CreationStepsComponent/>} />
            {/* Details routes*/}
            <Route path={"/products/:id/"} element={<ProductDetails />} />
            {/* Listing Routes*/}
            <Route path={"/"} element={<ProductList/>} />
            <Route path={"/checkout/"} element={< CheckoutPage/>} />
        </Routes>
    </div>
  );
}

export default App;
