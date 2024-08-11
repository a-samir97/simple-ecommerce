import React, {useState} from 'react';
import {Row, Col, Card, Button, Divider} from 'antd'
import ProductForm from '../components/ProductForm';
import {Link} from "react-router-dom";
import ProductList from "../components/ProductList";

const CreateProduct = () => {
    const [isProductCreated, setIsProductCreated] = useState(false)
    const handleProductCreation = () => {
        setIsProductCreated(true);
    }

    const isButtonDisabled = !(isProductCreated)
       return (
        <div style={{ padding: '20px' }}>
            <h1>Product Page</h1>
            <Divider></Divider>
            <Row gutter={[16, 16]} justify={'space-around'}>
                <Col span={8} >
                    <h2>Create Product</h2>
                    <Card title="Create New Product">
                        <ProductForm onProductCreation={handleProductCreation}/>
                    </Card>
                </Col>
            </Row>
            <Divider></Divider>
            <Link to={"/parts/"}>
                <Button disabled={isButtonDisabled}>
                    Go to Part & Options
                </Button>
            </Link>
        </div>
    );
};

export default CreateProduct;
