import React, { useState } from 'react';
import { Form, Select, Input, Button, message } from 'antd';
import { CustomPriceAPI } from '../services/api';
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const PriceRuleForm = ({ onSubmit, formData }) => {
    const [priceRules, setPriceRules] = useState([{ options: [], additional_price: '' }]);

    const handleAddCustomPrice = () => {
        setPriceRules([...priceRules, { options: [], additional_price: '' }]);
    };

    const handleOptionChange = (value, index) => {
        const newPriceRules = [...priceRules];
        newPriceRules[index].options = value;
        setPriceRules(newPriceRules);
    };

    const handlePriceChange = (value, index) => {
        const newPriceRules = [...priceRules];
        newPriceRules[index].additional_price = value;
        setPriceRules(newPriceRules);
    };

    const checkForDuplicates = () => {
        const sortedOptions = priceRules.map(rule => rule.options.slice().sort());
        const setOfOptions = new Set(sortedOptions.map(comb => JSON.stringify(comb)));
        return setOfOptions.size !== sortedOptions.length;
    };

    const handleSubmit = async (values) => {
        if (checkForDuplicates()) {
            message.error("Duplicate combinations found! Please check your inputs.");
            return;
        }
        console.log(priceRules)
        try {
            await CustomPriceAPI(priceRules);
            message.success("Custom Price created successfully!");
            onSubmit(formData);
        } catch (error) {
            console.error('Error setting price rule:', error);
        }
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit} style={{ margin: "30px", width: "500px", marginLeft: "35%" }}>
            {priceRules.map((priceRule, index) => (
                <div key={index}>
                    <Form.Item label={`Select Price Rule ${index + 1}`} key={`options-${index}`}>
                        <Select
                            mode="multiple"
                            placeholder="Select options"
                            value={priceRule.options}
                            onChange={(values) => handleOptionChange(values, index)}
                        >
                            {formData.map((option) => (
                                <Option value={option.id} key={option.id}>{option.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Additional Price"
                        key={`price-${index}`}
                        rules={[{ required: true, message: 'Please enter the additional price' }]}
                    >
                        <Input
                            type="number"
                            placeholder="Enter additional price"
                            value={priceRule.additional_price}
                            onChange={(e) => handlePriceChange(e.target.value, index)}
                        />
                    </Form.Item>
                </div>
            ))}

            <Form.Item>
                <Button type="dashed" onClick={handleAddCustomPrice} style={{ width: '100%' }}>
                    Add Another Price Rule
                </Button>
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
