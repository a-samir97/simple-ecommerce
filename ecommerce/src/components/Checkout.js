import {OrderAPI} from "../services/api";
import {Button, message, Form, Input} from "antd";
import React from "react";
import {useNavigate} from "react-router-dom";

const Checkout = ({ cart }) => {
    const navigate = useNavigate();

    const handleCheckout = async (values) => {
        const total_price = cart.reduce((acc, item) => acc + item.total_price, 0)
        const data = {
            user: values.user,
            items: cart,
            total_price:total_price
        }
        try{
            const response = await OrderAPI(data);
            message.success("Thanks, Order is created sucuessfully.")
            localStorage.removeItem("cart")
            navigate("/")
        } catch (error) {
            message.error(error.response.data)
        }
    };

    return (
        <div>
            <h3>Checkout</h3>
            <Form onFinish={handleCheckout}>
               <Form.Item
                    label="Name"
                    name="user"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            <Button type="primary" htmlType={"submit"} disabled={cart.length === 0}>
                Proceed to Checkout
            </Button>
            </Form>

        </div>
    );
};

export default Checkout;