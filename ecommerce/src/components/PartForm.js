import React, {useEffect, useState} from 'react';
import { Form, Input, Button, Select} from 'antd';
import { PartAPI } from '../services/api';

const { Option } = Select;

const PartForm = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
            async function fetchProducts() {
                try {
                    const response = await fetch("http://localhost:8000/api/products/");
                    const data = await response.json();
                    setProducts(data)
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
            // FIXME: get called 2 times
            fetchProducts();
        },
        []);
    const handleSubmit = async (values) => {
        const data = { name: values.name, product: values.product};
        try {
            await PartAPI(data);
            console.log(values.name, values.product)
            alert('Part choice added successfully!');
        } catch (error) {
            console.error('Error adding part choice:', error);
        }
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Product" name="product" rules={[{ required: true, message: 'Please select an attribute' }]}>
                <Select placeholder="Select Product">
                            {
                                products.map((product) =>
                                    <Option value={product.id} key={product.id}>{product.name}</Option>
                                )
                            }
                            </Select>
            </Form.Item>
            <Form.Item label="Part Name" name="name" rules={[{ required: true, message: 'Please enter the part name' }]}>
                <Input placeholder="Enter part name" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Part(s) to product
                </Button>
            </Form.Item>
        </Form>
    );
};

export default PartForm;
