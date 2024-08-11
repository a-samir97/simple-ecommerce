import React, {useEffect, useState} from 'react';
import {Avatar, Col, List, Row, Card} from 'antd';
import {Divider} from "antd/lib";

const ProductList = () => {
    const [products, setProducts] = useState([]);
   // use effect to get the categories already exist in our database
    useEffect(() => {
            async function fetchProducts() {
                try {
                    const response = await fetch("http://localhost:8000/api/products/");
                    const data = await response.json();
                    setProducts(data)
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
            // FIXME: get called 2 times
            fetchProducts();
        },
        []);

  return(
        <Card>
            <Row gutter={16} justify={'space-around'}>
                <Col span={10}>
                    <h2>Product List</h2>
                    <Divider/>
                 <List
                    itemLayout="horizontal"
                    dataSource={products}
                    renderItem={(item, index) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={item.image} />}
                          title={<a href="https://ant.design">{item.name}</a>}
                          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                          key={item.id}
                        />
                      </List.Item>
                    )}
                  />
                </Col>
            </Row>
        </Card>
  )
};
export default ProductList;