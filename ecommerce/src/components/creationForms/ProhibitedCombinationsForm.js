import React, { useState } from 'react';
import { Form, Select, Button, message } from 'antd';
import { ProhibitedCombinationAPI } from '../../services/api';
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const ProhibitedCombinationsForm = ({ onSubmit, formData }) => {
    const [selectedCombinations, setSelectedCombinations] = useState([[]]);
    const navigate = useNavigate();

    const handleAddCombination = () => {
        setSelectedCombinations([...selectedCombinations, []]);
    };

    const handleChange = (value, index) => {
        const newCombinations = [...selectedCombinations];
        newCombinations[index] = value;
        setSelectedCombinations(newCombinations);
    };

    const checkForDuplicates = () => {
        const sortedCombinations = selectedCombinations.map(comb => comb.slice().sort());
        const setOfCombinations = new Set(sortedCombinations.map(comb => JSON.stringify(comb)));
        return setOfCombinations.size !== sortedCombinations.length;
    };

    const handleSubmit = async () => {
        if (checkForDuplicates()) {
            message.error('Duplicate combinations found. Please make sure all combinations are unique.');
            return;
        }

        try {
            const data = selectedCombinations.map(combination => ({ options: combination }));
            const response = await ProhibitedCombinationAPI(data);
            message.success("Prohibited combinations set successfully");
            onSubmit(response.json);
            navigate("/");
        } catch (error) {
            console.error('Error setting prohibited combinations:', error);
        }
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit} style={{ margin: "30px", width: "500px", marginLeft: "35%" }}>
            {selectedCombinations.map((combination, index) => (
                <Form.Item label={`Select Options for Combination ${index + 1}`} key={index}>
                    <Select
                        mode="multiple"
                        placeholder="Select options"
                        value={combination}
                        onChange={(value) => handleChange(value, index)}
                    >
                        {formData.map((option) => (
                            <Option value={option.id} key={option.id}>
                                {option.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            ))}

            <Form.Item>
                <Button type="dashed" onClick={handleAddCombination} style={{ width: '100%' }}>
                    Add Another Combination
                </Button>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Set Prohibited Combinations
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ProhibitedCombinationsForm;
