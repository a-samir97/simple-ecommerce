import React from 'react';
import { Form, Input, Button, Select} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { PartAPI } from '../services/api';
import {message} from "antd/lib";

const { Option } = Select;

const PartForm = ({onSubmit, formData}) => {
        const [form] = Form.useForm();
        const handleSubmit = async (values) => {
            const {product, names} = values;
            const payload = names.map(name =>({product, name}))
            try {
                const response = await PartAPI(payload);
                message.success("Parts created successfully!")
                onSubmit(response.data)
            } catch (error) {
                console.error('Error adding part choice:', error);
            }
    };

    return (
        <Form
            layout="horizontal"
            onFinish={handleSubmit}
            initialValues={{
                names:['']
            }}
            form={form}
            style={{margin: "30px", width:"500px", marginLeft: "35%"}}
        >
            <Form.Item label="Product" name="product" rules={[{ required: true, message: 'Please select an attribute' }]}>
                <Select placeholder="Select Product">
                        <Option value={formData.id} key={formData.id}>{formData.name}</Option>
                </Select>
            </Form.Item>
             <Form.List
        name="names"
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                label={index === 0 ? 'Parts' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input parts's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="part name"
                    style={
                        (index === 0)?
                        {
                            width: '60%',
                            marginLeft:"6%"
                        }
                    :
                        {
                      width: '55%',
                        marginLeft:"14%"
                    }
                    }
                  />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    style={{marginLeft:"7px"}}
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{
                  width: '60%',
                }}
                icon={<PlusOutlined />}
              >
                Add New Part
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Part(s) to product
                </Button>
            </Form.Item>
        </Form>
    );
};

export default PartForm;
