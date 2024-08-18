import React, {useState} from 'react';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const CartButton = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState(() => {
        // Retrieve cart from localStorage on page load
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const handleClick = () => {
        if (cart.length > 0) {
            navigate('/checkout'); // Redirect to checkout page
        } else {
            message.info('Your cart is empty.');
        }
    };

    return (
        cart.length > 0 && (
            <Button type="primary" onClick={handleClick}>
                Go to Checkout
            </Button>
        )
    );
};

export default CartButton;
