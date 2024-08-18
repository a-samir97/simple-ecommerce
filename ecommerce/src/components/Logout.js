import React from 'react';
import {Button} from 'antd';
import {useNavigate} from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();
    const handleLogout = ()=> {
        console.log("TEST")
        localStorage.removeItem("role")
        console.log(localStorage)
        navigate("/")
    }
    return (
            <Button type="primary" onClick={handleLogout}>
                Logout
            </Button>
    );
}
export default LogoutButton;