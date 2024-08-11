import React, {useEffect, useState} from 'react';
import { Form, Input, Button, Select} from 'antd';
import { OptionsAPI } from '../services/api';

const { Option } = Select;

const OptionForm = () => {
    const [parts, setParts] = useState([])

    useEffect(() => {
            async function fetchParts() {
                try {
                    const response = await fetch("http://localhost:8000/api/parts/");
                    const data = await response.json();
                    setParts(data)
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
            // FIXME: get called 2 times
            fetchParts();
        },
        []);
    const handleSubmit = async (values) => {
        const data = { attribute: values.attribute, choice_name: values.name, price: values.price};
        try {
            await OptionsAPI(data);
            alert('Part choice added successfully!');
        } catch (error) {
            console.error('Error adding part choice:', error);
        }
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Part" name="part" rules={[{ required: true, message: 'Please select an part' }]}>
                <Select placeholder="Select part">
                            {
                                parts.map((part) =>
                                    <Option value={part.id} key={part.id}>{part.name}</Option>
                                )
                            }
                </Select>
            </Form.Item>
            <Form.Item label="Option Name" name="name" rules={[{ required: true, message: 'Please enter the option name' }]}>
                <Input placeholder="Enter option name" />
            </Form.Item>
            <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please enter the price' }]}>
                <Input type="number" placeholder="Enter price" />
            </Form.Item>
            <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: 'Please enter the quantity' }]}>
                <Input type="number" placeholder="Enter quantity" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Option(s) Choice
                </Button>
            </Form.Item>
        </Form>
    );
};

export default OptionForm;
