import React, { useState } from 'react';
import {Button, List, Select, Row, Col, message, Input, Form} from 'antd';
import ProductSelection from "./ProductSelection";
import axios from "axios";
import {OrderAPI} from "../services/api";

const { Option } = Select;

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

const CartList = ({ cart, removeFromCart }) => (
    <List
        dataSource={cart}
        renderItem={(item, index) => (
            <List.Item
                actions={[<Button onClick={() => removeFromCart(index)}>Remove</Button>]}
            >
                <List.Item.Meta
                    title={item.name}
                    // description={`Parts: ${item.items.map(part => part.name).join(', ')}`}
                />
                <div>Total Price: ${item.total_price}</div>
            </List.Item>
        )}
    />
);

const Checkout = ({ cart }) => {
    const handleCheckout = async () => {
        // Implement checkout logic
        const total_price = cart.reduce((acc, item) => acc + item.total_price, 0)
        const data = {
            user: "Ahmed Samir", // FIXME
            items: cart,
            total_price:total_price
        }
        try{
            const response = await OrderAPI(data);
            message.success("Thanks, Order is created sucuessfully.")
        } catch (error) {
            message.error(error.response.data)
        }
    };

    return (
        <div>
            <h2>Checkout</h2>
            <Button type="primary" onClick={handleCheckout} disabled={cart.length === 0}>
                Proceed to Checkout
            </Button>
        </div>
    );
};

export default ProductPage;
