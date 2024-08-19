import React from 'react';
import {Button, Divider, Form, Input, Typography} from 'antd';
import {useNavigate} from "react-router-dom";
import LogoutButton from "../components/Logout";
import API from "../services/api";
const {Text} = Typography

const LoginPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("role")
    const onFinish = async (values) => {
      try {
          const response = await API.post("/api/token", values)
          localStorage.setItem("role", response.data["access"]);
          navigate("/");
      } catch (error) {
          console.log(error);
      }
    }
    return (
        <>
            {
                token ?
                <>
                    <h3> You already logged in </h3>
                    <Button href={"/"} style={{marginRight: '5px'}}> Product list </Button>
                    <LogoutButton />
                </>
                :
                <>
                 <h3>Login Page</h3>
                    <Text type="secondary">login page is for admins only, soon will be available for everyone</Text>
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
                    marginTop: "2%"
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
            }
    </>
    );
}
export default LoginPage;