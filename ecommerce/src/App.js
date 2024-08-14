import React from "react";
import './App.css';
import CategoryListPage from "./pages/CategoryPage";
import CreationStepsComponent from "./pages/CreationSteps";
import {Routes, Route} from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <div className="App">
        <Routes>
            {/* Creation routes */}
            <Route path={"/creation"} element={<CreationStepsComponent/>} />
            {/* Details routes*/}
            <Route path={"/products/:id"} element={<ProductDetails />} />
            {/* Listing Routes*/}
            <Route path={"/categories"} element={<CategoryListPage />} />
            <Route path={"/"} element={<ProductList/>} />
        </Routes>
    </div>
  );
}

export default App;
