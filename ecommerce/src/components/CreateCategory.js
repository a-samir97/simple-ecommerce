import {Button, Form, Input, Modal, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {CategoryAPI} from "../services/api";

const CreateCategory = ({visible}) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [file, setFile] = useState(null);

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCategoryCreation = async (values) => {
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('icon',file);
        try {
            await CategoryAPI(formData);
            alert('Product created successfully!');
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handleBeforeUpload = (file) => {
        setFile(file);  // Capture the file in state
        return false;   // Prevent automatic upload
    };

    return (
        <Modal
              title="Basic Modal"
              open={visible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                  <Button key="back" onClick={handleCancel}>
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
                            beforeUpload={handleBeforeUpload} // Prevents automatic upload
                            // onChange={handleFileChange}
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                 </Form>
          </Modal>
    )
}

export default CreateCategory;