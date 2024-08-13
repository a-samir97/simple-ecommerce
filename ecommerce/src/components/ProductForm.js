import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Select, Upload, Row, Col} from 'antd';
import {UploadOutlined} from "@ant-design/icons";
import {ProductsAPI} from "../services/api";
import CreateCategory from "./CreateCategory";

const { Option } = Select;

const ProductForm = ({onSubmit}) => {
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };
    async function fetchCategories() {
                try {
                    const response = await fetch("http://localhost:8000/api/categories/");
                    const data = await response.json();
                    setCategories(data)
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }

    useEffect(() => {
            // FIXME: get called 2 times
            fetchCategories();
        },
        []);

    const handleBeforeUpload = (file) => {
        setFile(file);  // Capture the file in state
        return false;   // Prevent automatic upload
    };
    const handleProductCreation = async (values) => {
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('image',file);
        formData.append('category', values.category)
        try {
            const response = await ProductsAPI(formData);
            console.log("Product Form Data:", response.data)
            onSubmit(response.data);
            alert('Product created successfully!');
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <Form layout="horizontal" onFinish={handleProductCreation} form={form}>
            <Form.Item label="Product Name" name="name" rules={[{ required: true, message: 'Please enter the product name' }]}>
                <Input placeholder="Enter product name" />
            </Form.Item>
            <Form.Item>
        <Row gutter={8}>
          <Col span={22}>
            <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category' }]}>
                            <Select placeholder="Select Category">
                            {
                                categories.map((category) =>
                                    <Option value={category.id} key={category.id}>{category.name}</Option>
                                )
                            }
                            </Select>
                        </Form.Item>
          </Col>
          <Col span={2}>
            <Button onClick={showModal}>+</Button>
          </Col>
        </Row>
      </Form.Item>
            <Form.Item
                        name="icon"
                        label="Product Image"
                        valuePropName="file"
                        getValueFromEvent={(e) => e && e.file}
                        rules={[{ required: true, message: 'Please upload an icon' }]}
                    >
                        <Upload
                            name="icon"
                            listType="picture"
                            beforeUpload={handleBeforeUpload}
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Create Product
                </Button>
            </Form.Item>

            <CreateCategory visible={isModalOpen}/>
        </Form>
    );
};

export default ProductForm;
