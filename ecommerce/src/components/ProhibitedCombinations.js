import React, { useState } from 'react';
import { Form, Select, Button } from 'antd';
import {ProhibitedCombinationAPI} from '../services/api';

const { Option } = Select;

const ProhibitedCombinations = ({onSubmit, formData}) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async (values) => {
        const data = { options: selectedOptions};
        try {
            const response = await ProhibitedCombinationAPI(data);
            onSubmit(response.json);
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
                        {
                                formData.map((option) =>
                                    <Option value={option.id} key={option.id}>{option.name}</Option>
                                )
                        }

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
