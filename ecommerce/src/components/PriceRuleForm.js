import React, { useState } from 'react';
import { Form, Select, Input, Button } from 'antd';
import { CustomPriceAPI } from '../services/api';
import {message} from "antd/lib";

const { Option } = Select;

const PriceRuleForm = ({onSubmit, formData}) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async (values) => {
        const data = { options: selectedOptions, additional_price: values.additionalPrice };
        console.log(data)
        try {
            await CustomPriceAPI(data);
            message.success("Custom Price created successfully, One last Step to finish")
            onSubmit(formData);

        } catch (error) {
            console.error('Error setting price rule:', error);
        }
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit} style={{margin: "30px", width:"500px", marginLeft: "35%"}}>
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
