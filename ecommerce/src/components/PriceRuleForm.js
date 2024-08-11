import React, { useState } from 'react';
import { Form, Select, Input, Button } from 'antd';
import { CustomPriceAPI } from '../services/api';

const { Option } = Select;

const PriceRuleForm = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async (values) => {
        const data = { options: selectedOptions, additional_price: values.additionalPrice };
        try {
            await CustomPriceAPI(data);
            alert('Price rule set successfully!');
        } catch (error) {
            console.error('Error setting price rule:', error);
        }
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Select Options" name="options">
                <Select
                    mode="multiple"
                    placeholder="Select options"
                    value={selectedOptions}
                    onChange={(values) => setSelectedOptions(values)}
                >
                    <Option value="full_suspension_frame">Full Suspension Frame</Option>
                    <Option value="diamond_frame">Diamond Frame</Option>
                    {/* Add more options dynamically */}
                </Select>
            </Form.Item>
            <Form.Item label="Additional Price" name="additionalPrice" rules={[{ required: true, message: 'Please enter the additional price' }]}>
                <Input type="number" placeholder="Enter additional price" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Set Price Rule
                </Button>
            </Form.Item>
        </Form>
    );
};

export default PriceRuleForm;
