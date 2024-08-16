import React, { useState } from 'react';
import { Button, List, Select, Row, Col} from 'antd';
import ProductSelection from "./ProductSelection";

const { Option } = Select;

const ProductPage = ({product}) => {
    const [cart, setCart] = useState(() => {
        // Retrieve cart from localStorage on page load
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const handleAddToCart = (product) => {
        setCart([...cart, product]);
    };

    const handleRemoveFromCart = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
    };
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
                    description={`Parts: ${item.parts.map(part => part.name).join(', ')}`}
                />
                <div>Total Price: ${item.totalPrice}</div>
            </List.Item>
        )}
    />
);

const Checkout = ({ cart }) => {
    const handleCheckout = () => {
        // Implement checkout logic
        console.log("Proceeding to checkout with items:", cart);
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
