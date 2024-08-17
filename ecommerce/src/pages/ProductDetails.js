import React, {useEffect, useState} from 'react';
import {Card, Row, Col, Typography, List, Image, Button} from 'antd';
import {useParams} from "react-router-dom";
import {Divider} from "antd/lib";
import ProductPage from "../components/ProductPage";
const { Title, Text } = Typography;

const ProductDetail = ({ product }) => {
    return (
        <>
        <Card style={{ maxWidth: '800px', margin: 'auto' }}>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width="100%"
                    />
                </Col>
                <Col span={16}>
                    <Title level={2}>{product.name}</Title>
                    <Text type="secondary">({product.category})</Text>
                </Col>
            </Row>

            {/* Parts and Options */}
            <div style={{ marginTop: '20px' }}>
                <Title level={4}>Options for {product.name} </Title>
                {product.parts.map(part => (
                    <Card
                        key={part.id}
                        title={part.name}
                        bordered={false}
                        style={{ marginBottom: '16px' }}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={part.options}
                            renderItem={option => (
                                <List.Item>
                                    <Text>{option.name}</Text>
                                    <Text italic type="secondary">${option.price}</Text>
                                    <Text italic type="secondary">{option.quantity} left</Text>
                                    <Image src={option.image} style={{width:"100px"}}></Image>
                                </List.Item>
                            )}
                        />
                    </Card>
                ))}
            </div>
        </Card>
    </>
    );
};

// Render the component
const ProductDetailsComponent = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchProductDetails = async() => {
            try {
                const response = await fetch(`http://localhost:8000/api/products/${id}/`)
                const data = await response.json()
                setProduct(data)
                setLoading(false)
            } catch (error) {
                console.log("Failed to fetch product details ", error);
                setLoading(false)
            }
        };

        fetchProductDetails();
    }, [id])

     if (loading) {
        return <div>Loading...</div>; // Show a loading state while fetching
      }

      if (!product) {
        return <div>Product not found.</div>; // Handle case where product is not found
      }

    return (
        <div style={{ padding: '20px' }}>
            <ProductDetail product={product} />
            <Divider/>
            <ProductPage product={product}/>
        </div>
    );
};

export default ProductDetailsComponent;
