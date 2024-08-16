import React, { useState } from 'react';
import {Form, Select, Button, message} from 'antd';
import {ProhibitedCombinationAPI} from '../services/api';
import {useNavigate} from "react-router-dom";

const { Option } = Select;

const ProhibitedCombinations = ({onSubmit, formData}) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        const data = { options: selectedOptions};
        try {
            const response = await ProhibitedCombinationAPI(data);
            message.success("Prohibited combinations set successfully")
            onSubmit(response.json);
            navigate("/")
        } catch (error) {
            console.error('Error setting prohibited combinations:', error);
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

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Set Prohibited Combination
                </Button>
            </Form.Item>

        </Form>
    );
};

export default ProhibitedCombinations;
