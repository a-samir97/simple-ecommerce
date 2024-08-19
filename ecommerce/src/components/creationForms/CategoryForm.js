import {Button, Form, Input, Modal, Upload, message} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {CategoryAPI} from "../../services/api";

const CategoryForm = ({visible, onCategoryCreated}) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(visible);
    const [file, setFile] = useState(null);
    const closeModal = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        setIsModalOpen(visible)
    }, [visible])

    const handleCategoryCreation = async (values) => {
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('icon',file);
        try {
            await CategoryAPI(formData);
            message.success('Category created successfully!');
            form.resetFields();
            onCategoryCreated();
            closeModal();
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };
    const handleBeforeUpload = (file) => {
        setFile(file);
        return false;
    };

    return (
        <Modal
              title="Basic Modal"
              open={isModalOpen}
              onOk={closeModal}
              onCancel={closeModal}
              footer={[
                  <Button key="back" onClick={closeModal}>
                    Return
                  </Button>,
                  <Button key="submit" type="primary" onClick={() => form.submit()}>
                    Submit
                  </Button>
                ]}
          >
                 <Form layout="vertical" onFinish={handleCategoryCreation} form={form}>
                    <Form.Item label="Category Name" name="name" rules={[{ required: true, message: 'Please input category name' }]}>
                        <Input placeholder="Enter category name"/>
                    </Form.Item>

                   <Form.Item
                        name="icon"
                        label="Upload Icon"
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
                 </Form>
          </Modal>
    )
}

export default CategoryForm;