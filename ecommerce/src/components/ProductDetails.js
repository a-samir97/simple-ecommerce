import React, {useEffect, useState} from 'react';
import {Row, Col, Image, Space, Descriptions, Button, Divider} from 'antd';
import {useParams} from "react-router-dom";
const items = [
  {
    key: '1',
    label: 'Product',
    children: 'Cloud Database',
  },
  {
    key: '2',
    label: 'Billing Mode',
    children: 'Prepaid',
  },
  {
    key: '3',
    label: 'Automatic Renewal',
    children: 'YES',
  },
  {
    key: '4',
    label: 'Order time',
    children: '2018-04-24 18:00:00',
  },
  {
    key: '5',
    label: 'Usage Time',
    children: '2019-04-24 18:00:00',
    span: 2,
  },
  {
    key: '6',
    label: 'Negotiated Amount',
    children: '$80.00',
  },
      {
    key: '7',
    label: 'Order time',
    children: '2018-04-24 18:00:00',
  },
  {
    key: '8',
    label: 'Usage Time',
    children: '2019-04-24 18:00:00',
    span: 2,
  },
  {
    key: '9',
    label: 'Negotiated Amount',
    children: '$80.00',
  },
  {
    key: '10',
    label: 'Order time',
    children: '2018-04-24 18:00:00',
  },
  {
    key: '11',
    label: 'Usage Time',
    children: '2019-04-24 18:00:00',
    span: 2,
  },
  {
    key: '12',
    label: 'Negotiated Amount',
    children: '$80.00',
  },
]

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
        <>
        <h2>Product Details</h2>
            <Divider></Divider>
        <div style={{margin:"100px"}}>
        <Row justify={"space-around"}>
            <Col span={12}>
                <Descriptions title="Product Info" bordered items={items} />
            </Col>
            <Col span={4}>
                <h4> Product Image </h4>
                <Image src={product.image}></Image>
            </Col>
        </Row>
            <Divider></Divider>
            <Space>
                <Button> Add to Cart</Button>
                <Button>Checkout</Button>
            </Space>
    </div>
    </>
    );
}
export default ProductDetailsComponent;