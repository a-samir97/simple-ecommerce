import React from "react";
import './App.css';
import CreateProduct from "./pages/CreateProduct";
import CategoryListPage from "./pages/CategoryPage";
import CreationStepsComponent from "./components/CreationSteps";
import {Routes, Route} from "react-router-dom";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path={"/creation"} element={<CreationStepsComponent/>} />
            <Route path={"/categories"} element={<CategoryListPage />} />
            <Route path={"/products"} element={<CreateProduct />} />
            <Route path={"/"} element={<ProductList/>} />
        </Routes>
    </div>
  );
}

export default App;
