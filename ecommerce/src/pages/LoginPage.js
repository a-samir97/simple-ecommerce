import React from 'react';
import {Button, Divider, Form, Input} from 'antd';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const onFinish = async (values) => {
      try {
          const response = await axios.post(
          "http://localhost:8000/api/token/", values);
          localStorage.setItem("role", response.data["access"]);
          navigate("/");
      } catch (error) {
          console.log(error);
      }
    }
    return (
        <>
            <h3>Login Page</h3>
            <Divider></Divider>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                    marginLeft:"30%",
                    marginTop: "5%"
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
export default LoginPage;