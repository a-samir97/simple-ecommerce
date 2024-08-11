import React from 'react';
import {Row, Col} from 'antd'
import CategoryList from "../components/CategoryList";
import {Divider} from "antd/lib";

const CategoryListPage = () => {
    return (
        <div style={{padding: '20px'}}>
            <h1>
                Categories
            </h1>
            <Row gutter={8} justify={'space-around'}>
                <Col span={8}>
                    <Divider></Divider>
                    <CategoryList/>
                </Col>
            </Row>
        </div>
    )
}

export default CategoryListPage;
