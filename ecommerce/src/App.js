import React from "react";
import './App.css';
import CategoryListPage from "./pages/CategoryPage";
import CreationStepsComponent from "./pages/CreationSteps";
import {Routes, Route} from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import ProductPage from "./components/ProductPage";
import Checkout from "./components/Checkout";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path={"/login/"} element={<LoginPage />} />
            <Route path={"/test"} element={<ProductPage />} />
            {/* Creation routes */}
            <Route path={"/create-product/"} element={<CreationStepsComponent/>} />
            {/* Details routes*/}
            <Route path={"/products/:id/"} element={<ProductDetails />} />
            {/* Listing Routes*/}
            <Route path={"/categories/"} element={<CategoryListPage />} />
            <Route path={"/"} element={<ProductList/>} />
            <Route path={"/checkout/"} element={< CheckoutPage/>} />
        </Routes>
    </div>
  );
}

export default App;
