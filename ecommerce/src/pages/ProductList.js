import React, {useEffect, useState} from 'react';
import {Space, Col, List, Row, Card, Pagination, Image, Button} from 'antd';
import {Divider} from "antd/lib";
import LogoutButton from "../components/Logout";
import API from "../services/api";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [current, setCurrent] = useState(1)
    const [totalCount, setTotalCount] = useState(10)
    const token = localStorage.getItem("role")

    async function fetchProducts(page) {
                try {
                    const response = await API.get(`/products/?page=${page}`);
                    const data = await response.data;
                    setProducts(data["results"])
                    setTotalCount(data["count"])
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }

    const paginationChange = async (page) => {
        await fetchProducts(page);
        setCurrent(page);
    }
    useEffect(() => {
            fetchProducts(current);
        },
        []);

  return(
        <Card>
            <Row gutter={16} justify={'space-around'}>
                <Col span={10}>
                   <h2>Product List</h2>
                    <Space>
                        <Button href={'/checkout/'}> Checkout</Button>
                        { token && (
                        <>
                            <Button href={'/create-product/'}> Create New Product</Button>
                            <LogoutButton/>
                        </>
                        )}
                    </Space>
                    <Divider/>
                 <List
                    itemLayout="horizontal"
                    dataSource={products}
                    renderItem={(item, index) => (
                      <List.Item>
                        <List.Item.Meta
                          title={<a href={`/products/${item.id}/`}>{item.name}</a>}
                          description={item.description}
                          key={item.id}
                        />
                       <Image
                            width={120}
                            src={item.image}
                          />
                      </List.Item>
                    )}
                  />
                </Col>
            </Row>
                    <Divider/>
                    <Pagination
                        align="center"
                        current={current}
                        onChange={paginationChange}
                        defaultCurrent={1}
                        total={totalCount}
                        showSizeChanger={false}
                    />
        </Card>
  )
};
export default ProductList;