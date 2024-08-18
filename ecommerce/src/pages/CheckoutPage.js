import React, {useState} from 'react';
import {Row, Col, Divider, Typography} from 'antd'
import CartList from "../components/CartList";
import Checkout from "../components/Checkout";

const CheckoutPage = () => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const removeFromCart = (index) => {
            const newCart = cart.filter((_, i) => i !== index);
            setCart(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
    };
    return (
        <div style={{padding: '20px'}}>
            <h1>
                Checkout
            </h1>
            <Divider></Divider>
            <Row gutter={8} justify={'space-around'}>
                <Col span={8}>
                    <h3>Cart List</h3>
                    <CartList cart={cart} removeFromCart={removeFromCart} />
                </Col>
                <Col span={8}>
                    <Checkout cart={cart}/>
                </Col>
            </Row>
        </div>
    )
}

export default CheckoutPage;
