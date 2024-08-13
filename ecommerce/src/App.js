import React from "react";
import './App.css';
import CreateProduct from "./pages/CreateProduct";
import CategoryListPage from "./pages/CategoryPage";
import CreationStepsComponent from "./components/CreationSteps";
import {Routes, Route} from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import PartsOptionsForm from "./components/TestComponent";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path={"/test/"} element={< PartsOptionsForm/>} />
            {/* Creation routes */}
            <Route path={"/creation"} element={<CreationStepsComponent/>} />
            {/* Details routes*/}
            <Route path={"/products/:id"} element={<ProductDetails />} />
            {/* Listing Routes*/}
            <Route path={"/categories"} element={<CategoryListPage />} />
            <Route path={"/products"} element={<CreateProduct />} />
            <Route path={"/"} element={<ProductList/>} />
        </Routes>
    </div>
  );
}

export default App;
