import React, { useState } from 'react';
import { Form, Select, Button } from 'antd';
import { CustomPriceAPI } from '../services/api';

const { Option } = Select;

const ProhibitedCombinations = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async (values) => {
        const data = { options: selectedOptions, additional_price: values.additionalPrice };
        try {
            await CustomPriceAPI(data);
            alert('Prohibited combinations set successfully!');
        } catch (error) {
            console.error('Error setting prohibited combinations:', error);
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
                    {/*need to fill data by calling endpoint to get options*/}
                    {/* need to make the form more dynamic to accept more than prohibited combinations */}

                    <Option value="full_suspension_frame">Full Suspension Frame</Option>
                    <Option value="diamond_frame">Diamond Frame</Option>

                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Set Prohibited Combination
                </Button>
            </Form.Item>

        </Form>
    );
};

export default ProhibitedCombinations;
