import React, { useState, useEffect } from 'react';
import { Button, Card, Select, InputNumber, Form, Input } from 'antd';

const { Option } = Select;

const ProductSelection = ({ addToCart, product }) => {
  const [selectedParts, setSelectedParts] = useState([]);
  const [quantity, setQuantity] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    // Update total price when selected parts or quantity change
    const price = selectedParts.reduce((sum, part) => sum + (part?.price || 0) * (quantity || 0), 0);
    setTotalPrice(price);
  }, [selectedParts, quantity]);

  const handlePartChange = (partIndex, option) => {
    const newParts = [...selectedParts];
    newParts[partIndex] = { name: product.parts[partIndex].name, option, price: option.price, quantity: option.quantity };
    setSelectedParts(newParts);

    // Clear validation errors for the part if selected
    const newErrors = { ...validationErrors };
    delete newErrors[partIndex];
    setValidationErrors(newErrors);
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);

    // Clear validation errors for quantity if it is valid
    const newErrors = { ...validationErrors };
    if (value > 0) delete newErrors.quantity;
    setValidationErrors(newErrors);
  };

  const validateSelection = () => {
    const errors = {};

    product.parts.forEach((part, index) => {
      const selectedPart = selectedParts[index];
      if (!selectedPart) {
        errors[index] = `Please select a ${part.name}`;
      } else if (quantity == null || quantity === 0) {
        errors.quantity = 'Please enter a valid quantity';
      } else if (quantity > selectedPart.quantity) {
        errors.quantity = `Quantity exceeds available stock for ${selectedPart.name}`;
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddToCart = () => {
    if (validateSelection()) {
      const productData = {
        name: product.name,
        product: product.id,
        options: selectedParts.map((data) => data.option.value),
        total_price: totalPrice,
        quantity,
      };
      addToCart(productData);
    }
  };

  return (
    <Card title="Select Product">
      <Form layout="vertical">
        <Form.Item label="Product">
          <Input value={product.name} disabled />
        </Form.Item>

        {product.parts.map((part, index) => (
          <Form.Item
            key={index}
            label={`Select ${part.name}`}
            validateStatus={validationErrors[index] ? 'error' : ''}
            help={validationErrors[index]}
            required
          >
            <Select
              onChange={(value, option) => handlePartChange(index, option)}
            >
              {part.options
                .filter((option) => option.quantity > 0)
                .map((option) => (
                  <Option key={option.id} value={option.id} price={option.price} quantity={option.quantity}>
                    {option.name} (Available: {option.quantity})
                  </Option>
                ))}
            </Select>
          </Form.Item>
        ))}

        <Form.Item
          label="Quantity"
          validateStatus={validationErrors.quantity ? 'error' : ''}
          help={validationErrors.quantity}
          required
        >
          <InputNumber
            min={1}
            value={quantity}
            onChange={handleQuantityChange}
          />
        </Form.Item>

        <Form.Item label="Total Price">
          <Input value={totalPrice} disabled />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            onClick={handleAddToCart}
            disabled={!product || !quantity || selectedParts.length !== product.parts.length}
          >
            Add to Cart
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProductSelection;
