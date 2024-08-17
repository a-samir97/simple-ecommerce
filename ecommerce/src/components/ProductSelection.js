import React, { useState } from 'react';
import {Button, List, Card, Select, InputNumber, Form, Input} from 'antd';

const { Option } = Select;


const ProductSelection = ({ addToCart, product }) => {
    const [selectedParts, setSelectedParts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [validationErrors, setValidationErrors] = useState({});

    const handlePartChange = (partIndex, part) => {
        const newParts = [...selectedParts];
        newParts[partIndex] = part;
        setSelectedParts(newParts);
        console.log(selectedParts)
        // Update total price based on selected options
        let price = newParts.reduce((sum, part) => sum + (part?.price || 0), 0);
        setTotalPrice(price);

        // Clear validation errors for the part if selected
        const newErrors = { ...validationErrors };
        delete newErrors[partIndex];
        setValidationErrors(newErrors);
    };

    const validateSelection = () => {
        const errors = {};
        product.parts.forEach((part, index) => {
            if (!selectedParts[index]) {
                errors[index] = `Please select a ${part.name}`;
            }
        });
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddToCart = () => {
        if (validateSelection()) {
//             const itemData = {
// ,
//                 product: product.id
//             }
            const productData = {
                name: product.name,
                product: product.id,
                options:selectedParts.map(data => data.option),
                total_price: totalPrice
            };
            addToCart(productData);
        }
    };

    return (
        <Card title="Select Product">
            <Form layout="vertical">
                <Form.Item label="Product">
                    <Input
                        value={product.name}
                        disabled={true}
                    />
                </Form.Item>

                {/* Render parts based on selected product */}
                {product.parts.map((part, index) => (
                    <Form.Item
                        key={index}
                        label={`Select ${part.name}`}
                        validateStatus={validationErrors[index] ? 'error' : ''}
                        help={validationErrors[index]}
                    >
                        <Select onChange={(value, detail) => handlePartChange(index, { name: part.name, option: value, price: detail.price })}>
                            {part.options.map((option, i) => (
                                <Option key={i} value={option.id} price={option.price}>{option.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                ))}

                <Form.Item>
                    <Button
                        type="primary"
                        onClick={handleAddToCart}
                        disabled={!product || selectedParts.includes(null)}
                    >
                        Add to Cart
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};


export default ProductSelection;