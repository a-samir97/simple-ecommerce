import React, { useState } from 'react';
import {Button, List, Select, Row, Col, message, Input, Form} from 'antd';
import ProductSelection from "./ProductSelection";
import Checkout from "./Checkout";
import CartList from "./CartList";

const ProductPage = ({product}) => {
    const [cart, setCart] = useState(() => {
        // Retrieve cart from localStorage on page load
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const addToCart = (product) => {
            const newCart = [...cart, product];
            setCart(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const removeFromCart = (index) => {
            const newCart = cart.filter((_, i) => i !== index);
            setCart(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
    };
       return (
        <Row gutter={16}>
            <Col span={12}>
                <ProductSelection addToCart={addToCart} product={product} />
            </Col>
            <Col span={12}>
                <CartList cart={cart} removeFromCart={removeFromCart} />
                <Checkout cart={cart}/>
            </Col>
        </Row>
    );
};

export default ProductPage;