import React, {useEffect, useState} from 'react';
import {Space, Col, List, Row, Card, Pagination, Image, Button} from 'antd';
import {Divider} from "antd/lib";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [current, setCurrent] = useState(1)
    const [totalCount, setTotalCount] = useState(10)

    const paginationChange = async (page) => {
        const response = await fetch(`http://localhost:8000/api/products/?page=${page}`)
        const data = await response.json();
        console.log(data)
        setCurrent(page)
        setProducts(data["results"])
    }
   // use effect to get the categories already exist in our database
    useEffect(() => {
            async function fetchProducts() {
                try {
                    const response = await fetch("http://localhost:8000/api/products/");
                    const data = await response.json();
                    setProducts(data["results"])
                    setTotalCount(data["count"])
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
                    <Space>
                       <h2>Product List</h2>
                        <Button href={'/create-product/'}> Create New Product</Button>
                    </Space>
                    <Divider/>
                 <List
                    itemLayout="horizontal"
                    dataSource={products}
                    renderItem={(item, index) => (
                      <List.Item>
                        <List.Item.Meta
                          title={<a href={`/products/${item.id}/`}>{item.name}</a>}
                          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
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