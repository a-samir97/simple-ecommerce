import React, {useEffect, useState} from 'react';
import { Form, Input, Button, Row, Col, Upload, Divider } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {OptionsAPI} from "../services/api";

const { Item } = Form;

const PartsOptionsForm = ({onSubmit, formData}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState({}); // Store files by part ID and option index

  const onFinish = async (values) => {
        const formattedData = Object.entries(values.parts).flatMap(([partID, partData]) =>
           partData.options.map((option, optionIndex) => ({
          part: partID,
          name: option.name,
          price: option.price,
          image: fileList[`${partID}_${optionIndex}`],
        }))
      );

      const payload = new FormData();
      formattedData.forEach((data, index) => {
          payload.append(`option[${index}][name]`, data.name)
          payload.append(`option[${index}][price]`, data.price)
          payload.append(`option[${index}][image]`, data.image)
          payload.append(`option[${index}][part]`, data.part)
      })

      console.log(payload)
        try {
            const response = await OptionsAPI(payload);
            onSubmit(response.data)
            alert('Part choice added successfully!');
        } catch (error) {
            console.error('Error adding part choice:', error);
        }
    console.log('Form values:', values);
  };

  const handleFileChange = (partID, optionIndex, info) => {
    const file = info.file;
    if (file.status !== 'removed') {
      setFileList(prevFileList => ({
        ...prevFileList,
        [`${partID}_${optionIndex}`]: file, // Store file with a unique key
      }));
    }
  };

  return (
    <Form
      form={form}
      name="parts-options-form"
      onFinish={onFinish}
      layout="vertical"
    >
      {/* Dynamic Parts Fields */}
      <Item name="parts">
        <Form.List name="parts">
          {(fields, { add, remove }) => (
            <>
              {formData.map(({ id, name}) => (
                <div key={id}>
                  <Divider orientation="left">Part: {name} </Divider>
                  {/* Dynamic Options Fields for Each Part */}
                  <Form.List name={[id.toString(), 'options']}>
                    {(optionFields, { add: addOption, remove: removeOption }) => (
                      <>
                        {optionFields.map(({ key: optionKey, name: optionName, fieldKey: optionFieldKey, ...restOptionField }) => (
                          <div key={optionKey} style={{ marginBottom: 16 }}>
                            <Row gutter={16} align="middle">
                              <Col span={8}>
                                <Item
                                  {...restOptionField}
                                  name={[optionName, 'name']}
                                  rules={[{ required: true, message: 'Missing option name' }]}
                                  style={{ marginBottom: 0 }}
                                >
                                  <Input placeholder="Option name" />
                                </Item>
                              </Col>
                              <Col span={8}>
                                <Item
                                  {...restOptionField}
                                  name={[optionName, 'price']}
                                  rules={[{ required: true, message: 'Missing option price' }]}
                                  style={{ marginBottom: 0 }}
                                >
                                  <Input type="number" placeholder="Option price" />
                                </Item>
                              </Col>
                              <Col span={6}>
                                <Item
                                  {...restOptionField}
                                  name={[optionName, 'image']}
                                  rules={[{ required: true, message: 'Please upload an image' }]}
                                  style={{ marginBottom: 0 }}
                                >
                                  <Upload
                                    name="image"
                                    listType="picture"
                                    maxCount={1}
                                    beforeUpload={() => false}
                                    showUploadList={false}
                                    onChange={info => handleFileChange(id, optionName, info)}
                                  >
                                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                                  </Upload>
                                </Item>
                              </Col>
                              <Col span={2} >
                                <MinusCircleOutlined
                                  onClick={() => removeOption(optionName)}
                                />
                              </Col>
                            </Row>
                          </div>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => addOption()}
                            icon={<PlusOutlined />}
                          >
                            Add Option
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                  <MinusCircleOutlined
                    onClick={() => remove(name)}
                    style={{ marginBottom: 8 }}
                  />
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add Part
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PartsOptionsForm;
